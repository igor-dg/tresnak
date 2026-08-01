<?php
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("Cache-Control: no-store");
header("Referrer-Policy: same-origin");

function respond($status, $message) {
    http_response_code($status);
    echo json_encode(["message" => $message], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Allow: POST");
    respond(405, "POST eskaerak bakarrik onartzen dira.");
}

$origin = (string) ($_SERVER["HTTP_ORIGIN"] ?? "");
if ($origin !== "" && $origin !== "https://idg.eus") {
    respond(403, "Eskaeraren jatorria ez da baliozkoa.");
}

// Honeypot: real users never see or fill this field.
if (trim((string) ($_POST["website"] ?? "")) !== "") {
    respond(200, "Eskerrik asko! Zure eskaera jaso dugu.");
}

$startedAt = filter_var($_POST["started_at"] ?? null, FILTER_VALIDATE_INT);
$now = time();
if ($startedAt === false || $startedAt > $now || ($now - $startedAt) < 3 || ($now - $startedAt) > 7200) {
    respond(400, "Inprimakia iraungi da. Freskatu orria eta saiatu berriro.");
}

if (($_POST["consent"] ?? "") !== "1") {
    respond(400, "Pribatutasun-politika onartu behar duzu.");
}

$email = trim((string) ($_POST["email"] ?? ""));
if ($email === "" || strlen($email) > 254 || preg_match('/[\r\n]/', $email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, "Adierazi baliozko helbide elektroniko bat.");
}

$subject = "Jokatu beta eskaera berria";
$body = implode("\r\n", [
    "Jokatu!-ren Android beta itxian parte hartzeko eskaera berria:",
    "",
    "Google kontua: " . $email,
    "Baimena: beta kudeatzea eta Google Play-ko probatzaileen zerrendan gehitzea.",
    "Data (UTC): " . gmdate("Y-m-d H:i:s"),
    "",
    "Helbide hau Google Play Console-ko probatzaileen zerrendan gehitu eta parte hartzeko esteka bidali behar zaio.",
]);

$configPath = dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . "jokatu-beta-config.php";
if (!is_file($configPath)) {
    error_log("Jokatu beta Cloudflare configuration file is missing.");
    respond(503, "Beta-formularioa ez dago prest. Idatzi info@idg.eus helbidera.");
}

$config = require $configPath;
$accountId = trim((string) ($config["cloudflare_account_id"] ?? ""));
$apiToken = trim((string) ($config["cloudflare_api_token"] ?? ""));
$destination = trim((string) ($config["destination_email"] ?? ""));

if (
    !preg_match('/^[a-f0-9]{32}$/i', $accountId)
    || strlen($apiToken) < 20
    || strlen($apiToken) > 256
    || preg_match('/[\r\n]/', $apiToken)
    || !filter_var($destination, FILTER_VALIDATE_EMAIL)
) {
    error_log("Jokatu beta Cloudflare configuration is invalid.");
    respond(503, "Beta-formularioa ez dago prest. Idatzi info@idg.eus helbidera.");
}

$payload = json_encode([
    "to" => $destination,
    "from" => [
        "address" => "info@idg.eus",
        "name" => "Jokatu Beta",
    ],
    "subject" => $subject,
    "text" => $body,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if ($payload === false) {
    error_log("Jokatu beta email payload could not be encoded.");
    respond(500, "Ezin izan da eskaera bidali. Idatzi info@idg.eus helbidera.");
}

$endpoint = "https://api.cloudflare.com/client/v4/accounts/" . rawurlencode($accountId) . "/email/sending/send";
$ch = curl_init($endpoint);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer " . $apiToken,
        "Content-Type: application/json",
        "Accept: application/json",
    ],
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_USERAGENT => "JokatuBeta/1.0 (+https://idg.eus/jokatu/)",
]);
$cloudflareResponse = curl_exec($ch);
$cloudflareStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

$result = is_string($cloudflareResponse) ? json_decode($cloudflareResponse, true) : null;
$delivered = is_array($result["result"]["delivered"] ?? null) ? $result["result"]["delivered"] : [];
$queued = is_array($result["result"]["queued"] ?? null) ? $result["result"]["queued"] : [];
$acceptedDestinations = array_map("strtolower", array_merge($delivered, $queued));
$accepted = $cloudflareStatus >= 200
    && $cloudflareStatus < 300
    && ($result["success"] ?? false) === true
    && in_array(strtolower($destination), $acceptedDestinations, true);

if (!$accepted) {
    $errorCodes = [];
    foreach (($result["errors"] ?? []) as $cloudflareError) {
        if (isset($cloudflareError["code"])) {
            $errorCodes[] = (string) $cloudflareError["code"];
        }
    }
    error_log(
        "Jokatu beta Cloudflare email failed (HTTP " . $cloudflareStatus
        . "; API errors: " . implode(",", $errorCodes)
        . "; cURL: " . $curlError . ")."
    );
    respond(502, "Ezin izan da eskaera bidali. Idatzi info@idg.eus helbidera.");
}

respond(200, "Eskerrik asko! Beta prest dagoenean idatziko dizugu.");
