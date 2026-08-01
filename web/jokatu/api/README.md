# Jokatu! API

Karpeta hau zerbitzarian `https://idg.eus/jokatu/api/` helbidean argitaratzeko da.

## Fitxategiak

- `definizioa.php`: Harluxet Hiztegi Entziklopedikoaren definizioak eskuratzen ditu.
- `itzultzaile.php`: Elhuyar Hiztegiaren euskaratik gaztelaniarako emaitzak eskuratzen ditu.
- `beta.php`: beta-proban izena emateko eskaera Cloudflare Email Service bidez bidaltzen du.

Hiztegi-endpointak publikoak eta irakurtzeko soilik dira. `GET` eta `OPTIONS` eskaerak onartzen dituzte,
eta `hitza` parametroa erabiltzen dute (`palabra` bateragarritasunagatik ere onartzen da).
`beta.php` endpointak `POST` eskaerak bakarrik onartzen ditu eta `email`, `consent`, `started_at` eta
spamaren aurkako `website` eremuak jasotzen ditu.

## Zerbitzariaren betekizunak

- PHP 7.4 edo berriagoa.
- `curl`, `dom` eta `libxml` PHP hedapenak.
- Zerbitzaritik kanporako konexioa Elhuyarrera (HTTPS) eta Harluxeten zerbitzari zaharrera (HTTP).
- UTF-8 erantzunak.
- Cloudflare Email Routing-en egiaztatutako helmuga bat.
- `Email Sending: Edit` baimena duen Cloudflare API token bat.
- Zerbitzariaren web-direktoriotik kanpoko `jokatu-beta-config.php` konfigurazio pribatua.

## Beta-formularioaren konfigurazio pribatua

Biltegiko `jokatu-beta-config.example.php` fitxategia kopiatu zerbitzarian, `public_html` direktoriotik
kanpo, `jokatu-beta-config.php` izenarekin. `beta.php` fitxategiak web-errotik gorako direktorioan
bilatzen du. Ordeztu hiru balioak:

- `cloudflare_account_id`: Cloudflare kontuaren 32 karaktereko IDa.
- `cloudflare_api_token`: `Email Sending: Edit` token pribatua.
- `destination_email`: Email Routing-en agertzen den benetako helmuga egiaztatua; ez `info@idg.eus` aliasa.

Fitxategi erreal hori `.gitignore` barruan dago eta ez da inoiz web-direktoriora edo Git-era igo behar.

## Probak

Fitxategiak igo ondoren, egiaztatu:

```text
https://idg.eus/jokatu/api/definizioa.php?hitza=etxe&definition_only=true
https://idg.eus/jokatu/api/itzultzaile.php?hitza=etxe&definition_only=true
```

Bi URLek `200` egoera eta HTML edukia itzuli behar dute. Parametrorik gabeko eskaerak `400` itzuli
behar du.

Beta-endpointa formularioaren bidez probatu behar da. Eskaera baliozko batek `200` itzuli eta
egiaztatutako helmugako postontzian mezua sortu behar du. Cloudflarek mezua entregatu edo ilaran jarri
duela baieztatzen ez badu, endpointak `502` itzuliko du. `GET` eskaera batek `405` itzuli behar du.

Aplikazioko `src/services/dictionaryApi.js` fitxategiak dagoeneko
`https://idg.eus/jokatu/api` erabiltzen du. Mantendu `/tresnak/` helbide zaharrak trantsizioan,
bertsio berria gailu batean egiaztatu arte.

Ez igo zerbitzariko pasahitzik, API gakorik edo bestelako sekreturik Git biltegira.
