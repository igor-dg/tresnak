<script setup>
import NavigationCard from '../components/NavigationCard.vue';
import PageHeader from '@/components/ui/PageHeader.vue'
</script>

<template>
  <div class="page-shell">
    <PageHeader
      title="Ongi etorri euskara ikasteko gure plataformara"
      description="Orrialde honek hizkuntzaren ikaskuntza prozesua errazteko eta hobetzeko diseinatutako tresna espezifikoak eskaintzen ditu."
    >
      <h2 class="hidden md:block text-2xl font-semibold text-[var(--text-primary)] mt-8">
        Hona hemen eskura ditugun gure tresna nagusiak:
      </h2>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <NavigationCard
        title="Hiztegle"
        description="Asmakizun joko dibertigarria non definizio bat emanda hitza asmatu behar duzun. Wordle euskaraz, baina definizioarekin!"
        route="/hiztegle"
      />

      <NavigationCard
        title="Sinonimoen jokoa"
        description="Hiztegia zabaltzeko tresna interaktiboa, hizkuntzaren sinonimoak ezagutuz eta praktikatuz."
        route="/sinonimoak-jokoa"
      />

      <NavigationCard
        title="Sinonimoen Zerrenda"
        description="Ikasgelan erabilitako euskarazko sinonimoen bilduma sakona, ikasteko eta erreferentzia gisa balio duena, sinonimoen jokoa osatuz."
        route="/sinonimoak-zerrenda"
      />

      <NavigationCard
        title="C1-eko hiztegia"
        description="Euskarazko ikasgaietatik beren-beregi bildutako termino eta esamoldeen bilduma, azterketarako erreferentzia azkar eta eraginkorra emanez."
        route="/hiztegia"
      />

      <NavigationCard
        title="Aditz laguntzaileak"
        description="Euskarazko aditz osagarrien ulermena eta erabilera indartzeko diseinatutako baliabidea, perpausak behar bezala eraikitzeko."
        route="/aditzak"
      />
      <NavigationCard
        title="Aditz taulak"
        description="Euskal aditzak jokatzeko taulak."
        route="/aditz-taulak"
      />
      <NavigationCard
      title="Estatistikak"
      description="Zure erantzunak eta puntuazioa ikusi, eta hobetzeko aukerak aztertu."
      route="/estatistikak"
    />
    </div>
  </div>
</template>
