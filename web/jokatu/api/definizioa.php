<?php
header("Content-Type: text/html; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("X-Content-Type-Options: nosniff");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    header("Allow: GET, OPTIONS");
    exit("GET eskaerak bakarrik onartzen dira.");
}

$word = trim((string) ($_GET["hitza"] ?? $_GET["palabra"] ?? ""));
$definitionOnly = isset($_GET["definition_only"]) && $_GET["definition_only"] === "true";

if ($word === "" || strlen($word) > 200) {
    http_response_code(400);
    exit("Hitz baliodun bat adierazi behar da.");
}

echo getDefinitions($word, $definitionOnly);

function getDefinitions($word, $definitionOnly = false) {
    // Harluxet's legacy server does not accept HTTPS connections.
    $url = "http://www1.euskadi.net/harluxet/hiztegia1.asp?sarrera=" . rawurlencode($word);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_USERAGENT => "Jokatu/1.0 (+https://idg.eus/jokatu/)",
    ]);
    $html = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($html === false || $status < 200 || $status >= 300) {
        error_log("Harluxet request failed (HTTP {$status}): {$curlError}");
        http_response_code(502);
        return "Ezin izan da Harluxet hiztegiarekin konektatu.";
    }

    $dom = new DOMDocument();
    $previousLibxmlState = libxml_use_internal_errors(true);
    $loaded = $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();
    libxml_use_internal_errors($previousLibxmlState);

    if (!$loaded) {
        http_response_code(502);
        return "Ezin izan da Harluxet hiztegiaren erantzuna irakurri.";
    }

    $xpath = new DOMXPath($dom);

    // Find the <testua> element
    $definitions = $xpath->query("//testua");

    if ($definitions->length > 0) {
        $definition = $definitions->item(0);

        // Remove all <a> tags but keep their text content
        $anchors = $xpath->query(".//a", $definition);
        foreach ($anchors as $anchor) {
            $anchor->parentNode->replaceChild($dom->createTextNode($anchor->nodeValue), $anchor);
        }

        if ($definitionOnly) {
            // Remove the example text within <i> tags
            $italics = $xpath->query(".//i", $definition);
            foreach ($italics as $italic) {
                $italic->parentNode->removeChild($italic);
            }
        }

        // Get the processed definition text
        $definitionText = $dom->saveHTML($definition);

        // Clean up the output by removing the <testua> tags
        $definitionText = preg_replace('/<\/?testua>/', '', $definitionText);
        // Harluxet uses a legacy Windows-1252 bullet without declaring its charset.
        $definitionText = str_replace(["\xC2\x95", "\x95", "&#149;"], "•", $definitionText);

        return trim($definitionText);
    }

    return "Harluxet hiztegian hitz honek ez du definiziorik. Begiratu itzulpena.";
}
