<script setup>
import { ref } from 'vue'
import {
  seleccionarSujeto,
  seleccionarObjeto,
  aplicarReglasFrase,
  obtenerConjugacionSujeto,
  obtenerConjugacionObjeto,
  obtenerConjugacion
} from '@/utils.js'
import aditzakJsonData from '@/data/aditzak.json'
import esaldiakJsonData from '@/data/esaldiak.json'

const props = defineProps({
  sistema: String,
  tiempo: String,
  currentSubject: String,
  currentObject: String,
  hints: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['hint-used'])

const aditzakData = ref(Object.entries(aditzakJsonData.sistema).map(([sistema, conjugaciones]) => ({
  sistema,
  ...conjugaciones
})))

const esaldiak = ref(Object.entries(esaldiakJsonData.sistema).map(([id, frases]) => ({
  id,
  frases
})))

function showHint(type) {
  const hintData = generateHint(type)
  emit('hint-used', { type, data: hintData })
}

function generateHint(type) {
    if (type === 'megaPista') {
  return {
    imagen: `/img/${props.sistema.toLowerCase()}_${props.tiempo}.png`
  }
}

  if (type === 'pista1' || type === 'pista2' || type === 'superPista') {
    return generateHintPhrase(type)
  }

  return {
    frase: 'Ejemplo frase',
    sistema: props.sistema,
    tiempo: props.tiempo
  }
}

function generateHintPhrase(type) {
    const sistemasDisponibles = ['nor', 'nor-nori', 'nor-nork', 'nor-nori-nork']
  .filter(s => {
    if (type === 'superPista') return s === props.sistema
    if (type === 'pista2') return s !== props.sistema && s !== hints.value.pista1.sistema
    return s !== props.sistema
  })
  
  const sistemaAleatorio = sistemasDisponibles[Math.floor(Math.random() * sistemasDisponibles.length)]
  const tiempo = props.tiempo

  const grupoAleatorio = aditzakData.value.find(grupo => grupo.sistema === sistemaAleatorio)
  const frasesSistema = esaldiak.value.find(sistema => sistema.id === grupoAleatorio.sistema)?.frases || []
  const fraseAleatoria = frasesSistema[Math.floor(Math.random() * frasesSistema.length)]

  if (!fraseAleatoria) return { frase: 'No se pudo generar la frase', sistema: sistemaAleatorio, tiempo }

  let fraseConjugada = fraseAleatoria.phrase
  const variables = fraseAleatoria.variables || {}

  // For superPista, ensure different subject than current
  const currentSubject = document.querySelector('h2')?.textContent?.match(/{subject}|[A-Z]+/)?.[0]
  let subject
  do {
    subject = variables.subject_fixed || seleccionarSujeto(grupoAleatorio.sistema)
  } while (type === 'superPista' && subject === props.currentSubject)
  
  const subject_conj = variables.subject_conjugation || obtenerConjugacionSujeto(subject)
  fraseConjugada = fraseConjugada.replace('{subject}', subject)

  let object_conj = null
  if (fraseConjugada.includes('{object}')) {
    let object
    do {
      object = variables.object_fixed || seleccionarObjeto(grupoAleatorio.sistema, subject)
    } while (type === 'superPista' && object === props.currentObject)
    
    object_conj = variables.object_conjugation || obtenerConjugacionObjeto(object)
    fraseConjugada = fraseConjugada.replace('{object}', object)
  }

  fraseConjugada = aplicarReglasFrase(fraseConjugada, tiempo)

  const numero = variables.number || 'Sing'
  const conjugacionCorrecta = obtenerConjugacion(grupoAleatorio, tiempo, subject_conj, object_conj, numero)

  fraseConjugada = `${fraseConjugada} → ${conjugacionCorrecta}`

  return {
    frase: fraseConjugada,
    sistema: sistemaAleatorio,
    tiempo
  }
}
</script>

<template>
  <div>
    <div class="text-center mt-4">
      <button class="btn btn-info mr-2" :disabled="hints.pista1.used" @click="showHint('pista1')">
        Pista 1
      </button>
      <button class="btn btn-info mr-2" :disabled="hints.pista2.used" @click="showHint('pista2')">
        Pista 2
      </button>
      <button class="btn btn-warning mr-2" :disabled="hints.superPista.used" @click="showHint('superPista')">
        Superpista
      </button>
      <button class="btn btn-danger" :disabled="hints.megaPista.used" @click="showHint('megaPista')">
        Megapista
      </button>
    </div>

    <div class="row mt-3">
      <div class="col-md-4 h-100" v-if="hints.pista1.frase">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><strong>1. Pista</strong></h5>
            <p>{{ hints.pista1.frase }}</p>
            <p>
              <strong>Sistema:</strong> {{ hints.pista1.sistema }} | 
              <strong>Aldia eta denbora:</strong> {{ hints.pista1.tiempo }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-4 h-100" v-if="hints.pista2.frase">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><strong>Pista 2</strong></h5>
            <p>{{ hints.pista2.frase }}</p>
            <p>
              <strong>Sistema:</strong> {{ hints.pista2.sistema }} | 
              <strong>Aldia eta denbora:</strong> {{ hints.pista2.tiempo }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-4 h-100" v-if="hints.superPista.frase">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><strong>Superpista</strong></h5>
            <p>{{ hints.superPista.frase }}</p>
            <p>
              <strong>Sistema:</strong> {{ hints.superPista.sistema }} | 
              <strong>Aldia eta denbora:</strong> {{ hints.superPista.tiempo }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3" v-if="hints.megaPista.imagen">
      <div class="col-md-3"></div>
      <div class="col-md-6 h-100">
        <div class="card align-items-center">
          <div class="card-body">
            <h5 class="card-title"><strong>Megapista</strong></h5>
            <img :src="hints.megaPista.imagen" alt="Megapista" class="img-fluid">
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  margin: 0 0.5rem;
}

.card {
  margin-bottom: 1rem;
}
</style>