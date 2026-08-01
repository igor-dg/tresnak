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
    $url = "https://hiztegiak.elhuyar.eus/eu_es/" . rawurlencode($word);
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
        error_log("Elhuyar request failed (HTTP {$status}): {$curlError}");
        http_response_code(502);
        return "Ezin izan da Elhuyar hiztegiarekin konektatu.";
    }

    $dom = new DOMDocument();
    $previousLibxmlState = libxml_use_internal_errors(true);
    $loaded = $dom->loadHTML($html);
    libxml_clear_errors();
    libxml_use_internal_errors($previousLibxmlState);

    if (!$loaded) {
        http_response_code(502);
        return "Ezin izan da Elhuyar hiztegiaren erantzuna irakurri.";
    }

    $xpath = new DOMXPath($dom);

    if ($definitionOnly) {
        // Obtener solo los elementos p.lehena
        $definitions = $xpath->query("//ul[@class='hizkuntzaren_arabera hizkuntza-eu_es']//p[@class='lehena']");

        // Eliminar los enlaces
        $anchors = $xpath->query("//ul[@class='hizkuntzaren_arabera hizkuntza-eu_es']//p[@class='lehena']//a");
        foreach ($anchors as $anchor) {
            $anchor->parentNode->replaceChild($dom->createTextNode($anchor->nodeValue), $anchor);
        }

        // Crear nuevo ul solo con definiciones
        $newUl = $dom->createElement('ul');
        foreach ($definitions as $definition) {
            $newLi = $dom->createElement('li');
            $newLi->appendChild($dom->importNode($definition, true));
            $newUl->appendChild($newLi);
        }

        return $dom->saveHTML($newUl);
    } else {
        // Comportamiento original
        $definitions = $xpath->query("//ul[@class='hizkuntzaren_arabera hizkuntza-eu_es']");
        $anchors = $xpath->query("//ul[@class='hizkuntzaren_arabera hizkuntza-eu_es']//a");
        foreach ($anchors as $anchor) {
            $anchor->parentNode->replaceChild($dom->createTextNode($anchor->nodeValue), $anchor);
        }

        $output = '';
        foreach ($definitions as $definition) {
            $output .= $dom->saveHTML($definition);
        }
        return $output;
    }
}
