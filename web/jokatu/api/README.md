# Jokatu! API

Karpeta hau zerbitzarian `https://idg.eus/jokatu/api/` helbidean argitaratzeko da.

## Fitxategiak

- `definizioa.php`: Harluxet Hiztegi Entziklopedikoaren definizioak eskuratzen ditu.
- `itzultzaile.php`: Elhuyar Hiztegiaren euskaratik gaztelaniarako emaitzak eskuratzen ditu.

Bi endpointak publikoak eta irakurtzeko soilik dira. `GET` eta `OPTIONS` eskaerak onartzen dituzte,
eta `hitza` parametroa erabiltzen dute (`palabra` bateragarritasunagatik ere onartzen da).

## Zerbitzariaren betekizunak

- PHP 7.4 edo berriagoa.
- `curl`, `dom` eta `libxml` PHP hedapenak.
- Zerbitzaritik kanporako konexioa Elhuyarrera (HTTPS) eta Harluxeten zerbitzari zaharrera (HTTP).
- UTF-8 erantzunak.

## Probak

Fitxategiak igo ondoren, egiaztatu:

```text
https://idg.eus/jokatu/api/definizioa.php?hitza=etxe&definition_only=true
https://idg.eus/jokatu/api/itzultzaile.php?hitza=etxe&definition_only=true
```

Bi URLek `200` egoera eta HTML edukia itzuli behar dute. Parametrorik gabeko eskaerak `400` itzuli
behar du.

Aplikazioko `src/services/dictionaryApi.js` fitxategiak dagoeneko
`https://idg.eus/jokatu/api` erabiltzen du. Mantendu `/tresnak/` helbide zaharrak trantsizioan,
bertsio berria gailu batean egiaztatu arte.

Ez igo zerbitzariko pasahitzik, API gakorik edo bestelako sekreturik Git biltegira.
