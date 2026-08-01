# Jokatu! webgune estatikoa

Karpeta honetako **edukia** (ez `jokatu` karpeta bera) zerbitzariko `/jokatu/` direktoriora igo behar da.

```text
web/jokatu/index.html          -> /jokatu/index.html
web/jokatu/laguntza.html       -> /jokatu/laguntza.html
web/jokatu/pribatutasuna.html  -> /jokatu/pribatutasuna.html
web/jokatu/assets/             -> /jokatu/assets/
web/jokatu/api/*.php           -> /jokatu/api/ (PHPak zerbitzaritik kopiatu ondoren)
```

Webguneak HTML, CSS eta landingeko beta-formulariorako JavaScript txiki bat erabiltzen ditu. Ez du
konpilaziorik, cookierik edo kanpoko baliabiderik behar. Beta-formularioak `/jokatu/api/beta.php`
endpointa eta Cloudflare Email Service-ren konfigurazio pribatua behar ditu. Gainerako orriak edozein
web zerbitzari estatikorekin egiazta daitezke.

Store-etarako URL nagusiak:

- Marketina: `https://idg.eus/jokatu/`
- Laguntza: `https://idg.eus/jokatu/laguntza.html`
- Pribatutasuna: `https://idg.eus/jokatu/pribatutasuna.html`
