<script setup>
import NavigationCard from '../components/NavigationCard.vue';
</script>

<template>
  <div class="hasiera container py-5">
    <header class="text-center mb-5">
      <h1 class="display-4 fw-bold mb-4">
        Ongi etorri euskara ikasteko gure plataformara
      </h1>
      <p class="lead mb-4">
        Orrialde honek hizkuntzaren ikaskuntza prozesua errazteko eta hobetzeko
        diseinatutako tresna espezifikoak eskaintzen ditu.
      </p>
      <h2 class="h3 mb-5">Hona hemen eskura ditugun gure tresna nagusiak:</h2>
    </header>

    <div class="row g-4">
      <div class="col-md-6 col-lg-6">
        <NavigationCard
          title="Sinonimoen jokoa"
          description="Hiztegia zabaltzeko tresna interaktiboa, hizkuntzaren sinonimoak ezagutuz eta praktikatuz."
          route="/sinonimoak-jokoa"
        />
      </div>

      <div class="col-md-6 col-lg-6">
        <NavigationCard
          title="Sinonimoen Zerrenda"
          description="Ikasgelan erabilitako euskarazko sinonimoen bilduma sakona, ikasteko eta erreferentzia gisa balio duena, sinonimoen jokoa osatuz."
          route="/sinonimoak-zerrenda"
        />
      </div>

      <div class="col-md-6 col-lg-6">
        <NavigationCard
          title="C1-eko hiztegia"
          description="Euskarazko ikasgaietatik beren-beregi bildutako termino eta esamoldeen bilduma, azterketarako erreferentzia azkar eta eraginkorra emanez."
          route="/hiztegia"
        />
      </div>

      <div class="col-md-6 col-lg-6">
        <NavigationCard
          title="Aditz laguntzaileak"
          description="Euskarazko aditz osagarrien ulermena eta erabilera indartzeko diseinatutako baliabidea, perpausak behar bezala eraikitzeko."
          route="/aditzak"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hasiera {
  max-width: 1200px;
}

h1 {
  color: #2c3e50;
}

.lead {
  color: #666;
}

h2 {
  color: #2c3e50;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .lead {
    font-size: 1.1rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
