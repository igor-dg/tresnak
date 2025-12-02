# Euskara Ikasteko Tresnak

## Deskribapena

Proiektu hau euskara ikasteko tresna multzo bat da, Vue.js-ekin eraikia. Helburua da euskararen ikaskuntzarako baliabide interaktiboak eta erabilgarriak eskaintzea, batez ere C1 mailako hiztegi, aditz eta sinonimoen inguruan.

Eduki guztiak **IKA** euskaltegi sareak (https://ika.eus) eskainitakoak dira.

**Proiektu operatiboa ikusteko: https://idg.eus/tresnak**

## Ezaugarriak

- **C1 mailako hiztegia**: Euskal hizkuntzaren ikasgaietan erabiltzen diren terminoen bilduma
- **Aditz laguntzaileak**: Euskal aditz osagarriak ikasteko eta praktikatzeko joko interaktiboa
- **Sinonimoen jokoa**: Euskal hiztegia aberasteko eta sinonimoak ikasteko jokoa
- **Hiztegle**: "Wordle" erako jokoa, baina euskarazko definizioekin eta hiztegi-ikaskuntzan oinarrituta
- **Estatistikak**: Zure ikasketa-prozesua jarraitzeko datu eta grafikoak
- **Aditz taulak**: Aditz laguntzaileen taula osoak ikusteko aukera

## Instalazioa

```bash
# Proiektua klonatu
git clone https://github.com/igor-dg/tresnak.git
cd tresnak

# Menpekotasunak instalatu
npm install

# Garapen zerbitzaria abiarazi
npm run dev
```

## Erabilera

Proiektua abiarazita, nabigatzailean `http://localhost:5173` helbidean (edo Vite-k adierazitako portuan) sartuko zara.

### Tresnak

- **Hiztegle**: Wordle bezalako joko bat, baina definizioetan oinarrituta, euskarazko hitzak asmatzeko jokoa.
- **Sinonimoen jokoa**: Hitz batentzat sinonimo posible guztiak idaztea eskatzen duen jokoa.
- **Sinonimoen Zerrenda**: Ikasgelan erabilitako euskarazko sinonimoen bilduma osoa.
- **C1-eko hiztegia**: Euskarazko ikasgaietatik bildutako terminoen hiztegia, bilatzaile eta definizio-bistaratzearekin.
- **Aditz laguntzaileak**: Euskal aditzak praktikatzeko jokoa, sistema guztiekin (NOR, NOR-NORI, NOR-NORK, NOR-NORI-NORK) eta denbora ezberdinekin.
- **Aditz taulak**: Aditz-sistema eta denbora guztien taula osoak kontsultatzeko.
- **Estatistikak**: Zure ikaskuntzaren bilakaera eta sistema/denbora bakoitzean duzun trebetasuna aztertzeko grafikoak.

## Proiektuaren egitura

```
/
├── src/                # Aplikazioaren iturburu kodea
│   ├── components/     # Berrerabilgarriak diren osagaiak
│   │   ├── Aditzak/    # Aditzen jokoari lotutako osagaiak
│   │   ├── Estatistikak/ # Estatistiken bistaratzea
│   │   ├── Hiztegia/   # Hiztegiaren osagaiak
│   │   ├── Hiztegle/   # Hiztegle jokoaren osagaiak
│   │   └── SinonimoakJokoa/ # Sinonimoen jokoaren osagaiak
│   ├── composables/    # Aplikazioan zehar erabilgarriak diren funtzioak
│   ├── data/           # JSON datuak (hiztegiak, aditzak, etab.)
│   ├── router/         # Nabigazioaren kudeaketa
│   ├── utils/          # Laguntza-funtzioak
│   └── views/          # Aplikazioaren orri nagusiak
├── public/             # Estatiko agertzen diren fitxategiak
└── vite.config.js      # Vite konfigurazioa
```

## Teknologiak

- [Vue.js 3](https://vuejs.org/) - JavaScript framework-a
- [Vue Router](https://router.vuejs.org/) - Orrialdeen kudeaketarako
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework-a
- [Vite](https://vitejs.dev/) - Eraikitze eta garapen tresna
- [Apexcharts](https://apexcharts.com/) - Estatistiken bisualizaziorako grafikoak
- [Lucide](https://lucide.dev/) - Ikonoen liburutegia

## Garapena

```bash
# Menpekotasunak instalatu
npm install

# Garapen zerbitzaria abiarazi
npm run dev

# Produkziorako aplikazioa eraikitzeko
npm run build
```

## Hedapena

Proiektua ViteJS-ren bidez eraiki da, eta `npm run build` komandoa erabiliz prestatzen da produkziorako. Ekoizpen bertsioa `/dist` karpetan sortzen da eta edozein web zerbitzarirekin zerbitzatu daiteke.

```bash
# Produkziorako eraikitzeko
npm run build

# Eraiki ondoren, aurrebista ikusteko
npm run preview
```

## Proiektuan laguntzea

Proiektu honetan lagundu nahi baduzu, oso ondo etorria zara! Hainbat modutan lagundu dezakezu:

1. **Kode-hobekuntzak**: Interfazea hobetu, errendimendua optimizatu, edo funtzionalitate berriak proposatzeko.
2. **Akatsen zuzenketak**: Aurkitutako akatsak zuzendu edo jakinarazteko.
3. **Eduki-gehiketak**: Hiztegi berriak, aditz-eredu gehiago, edo sinonimo-zerrenda zabaltzeko.
4. **Itzulpenak**: Interfazea beste euskalkietara egokitzeko.

Laguntzeko prozesua:

1. Proiektuaren fork bat sortu GitHub-en
2. Zure aldaketetarako adar berri bat sortu (`git checkout -b nire-hobekuntza`)
3. Zure aldaketak egin eta commit-era bidali (`git commit -am 'Hobekuntza: azalpena'`)
4. Zure adarrera igo (`git push origin nire-hobekuntza`)
5. Pull Request bat sortu

## Lizentzia
Proiektu hau MIT Lizentziaren pean argitaratu da. Lizentziari buruzko informazio gehiago nahi izanez gero, proiektuaren erroan dagoen `LICENSE` fitxategia kontsultatu.

MIT lizentzia irekia eta permisiboa da, kodearen erabilera, aldaketa eta banaketa errazten duena. Erabiltzaileei baimena ematen die software hau edozein helburutarako erabiltzeko, aldatzeko eta banatzeko, betiere lizentziaren aipamena mantentzen badute.

## Egileak eta eskerrak

- [Idg.eus](https://idg.eus) - Proiektuaren garapena
- [IKA Euskaltegiak](https://ika.eus) eta, batez ere, Anjel Txisbert - Edukien hornitzailea
