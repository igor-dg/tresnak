# Jokatu! webgune estatikoa

Karpeta honetako **edukia** (ez `jokatu` karpeta bera) zerbitzariko `/jokatu/` direktoriora igo behar da.

```text
web/jokatu/index.html          -> /jokatu/index.html
web/jokatu/laguntza.html       -> /jokatu/laguntza.html
web/jokatu/pribatutasuna.html  -> /jokatu/pribatutasuna.html
web/jokatu/assets/             -> /jokatu/assets/
web/jokatu/api/*.php           -> /jokatu/api/ (PHPak zerbitzaritik kopiatu ondoren)
```

Webgunea HTML eta CSS hutsez eginda dago: ez du konpilaziorik, JavaScriptik, cookierik edo kanpoko
baliabiderik behar. Lokalean egiaztatzeko, edozein web zerbitzari estatiko erabil daiteke karpeta honetan.

Store-etarako URL nagusiak:

- Marketina: `https://idg.eus/jokatu/`
- Laguntza: `https://idg.eus/jokatu/laguntza.html`
- Pribatutasuna: `https://idg.eus/jokatu/pribatutasuna.html`
