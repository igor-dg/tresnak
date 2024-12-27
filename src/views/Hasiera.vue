<script setup>
import NavigationCard from '../components/NavigationCard.vue';
</script>

<template>
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-[var(--text-primary)] mb-6 sm:text-5xl">
        Ongi etorri euskara ikasteko gure plataformara
      </h1>
      <p class="text-xl text-[var(--text-secondary)] mb-8">
        Orrialde honek hizkuntzaren ikaskuntza prozesua errazteko eta hobetzeko
        diseinatutako tresna espezifikoak eskaintzen ditu.
      </p>
      <h2 class="text-2xl font-semibold text-[var(--text-primary)] mb-12">
        Hona hemen eskura ditugun gure tresna nagusiak:
      </h2>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      
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