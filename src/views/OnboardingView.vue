<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  Database,
  Languages,
  MessageCircle,
  Puzzle,
  ShieldCheck,
  Shuffle,
  Sparkles,
  Table,
  X,
} from 'lucide-vue-next'

const props = defineProps({
  initialSlide: { type: Number, default: 0 },
  canClose: { type: Boolean, default: false },
})

const emit = defineEmits(['complete', 'close'])
const currentSlide = ref(Math.min(Math.max(props.initialSlide, 0), 3))
const direction = ref('next')
const touchStartX = ref(null)
const totalSlides = 4

const isFirst = computed(() => currentSlide.value === 0)
const isLast = computed(() => currentSlide.value === totalSlides - 1)

const goTo = (index) => {
  const target = Math.min(Math.max(index, 0), totalSlides - 1)
  direction.value = target >= currentSlide.value ? 'next' : 'back'
  currentSlide.value = target
}

const next = () => {
  if (isLast.value) emit('complete')
  else goTo(currentSlide.value + 1)
}

const previous = () => goTo(currentSlide.value - 1)

const handleKeydown = (event) => {
  if (event.key === 'ArrowRight') next()
  if (event.key === 'ArrowLeft' && !isFirst.value) previous()
  if (event.key === 'Escape' && props.canClose) emit('close')
}

const handleTouchStart = (event) => {
  touchStartX.value = event.changedTouches[0]?.clientX ?? null
}

const handleTouchEnd = (event) => {
  if (touchStartX.value === null) return
  const distance = (event.changedTouches[0]?.clientX ?? touchStartX.value) - touchStartX.value
  if (Math.abs(distance) > 55) {
    if (distance < 0 && !isLast.value) next()
    if (distance > 0 && !isFirst.value) previous()
  }
  touchStartX.value = null
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <main class="onboarding" @touchstart.passive="handleTouchStart" @touchend.passive="handleTouchEnd">
    <div class="onboarding__glow onboarding__glow--one" aria-hidden="true"></div>
    <div class="onboarding__glow onboarding__glow--two" aria-hidden="true"></div>

    <header class="onboarding__header">
      <div class="onboarding__brand">
        <img src="/logo_basic_white.svg" alt="" />
        <span>Jokatu!</span>
      </div>
      <button
        v-if="canClose"
        class="onboarding__close"
        type="button"
        aria-label="Itxi"
        @click="emit('close')"
      >
        <X />
      </button>
      <button
        v-else-if="!isLast"
        class="onboarding__skip"
        type="button"
        @click="goTo(totalSlides - 1)"
      >
        Saltatu
      </button>
    </header>

    <section class="onboarding__stage" aria-live="polite">
      <Transition :name="`slide-${direction}`" mode="out-in">
        <article :key="currentSlide" class="onboarding__slide">
          <template v-if="currentSlide === 0">
            <div class="welcome-mark" aria-hidden="true">
              <img src="/logo.svg" alt="" />
              <Sparkles class="welcome-mark__spark welcome-mark__spark--one" />
              <Sparkles class="welcome-mark__spark welcome-mark__spark--two" />
            </div>
            <p class="onboarding__eyebrow">Ongi etorri</p>
            <h1>Egunero pixka bat,<br />euskara hobetzeko.</h1>
            <p class="onboarding__lead">
              Ikasi, praktikatu eta ikusi zure bilakaera erronka labur eta dibertigarriekin.
            </p>
          </template>

          <template v-else-if="currentSlide === 1">
            <div class="onboarding__feature-icon onboarding__feature-icon--games" aria-hidden="true">
              <Puzzle />
            </div>
            <p class="onboarding__eyebrow">Ikasteko erronkak</p>
            <h1>Jolastu zure erara.</h1>
            <p class="onboarding__lead">Hiru joko, trebetasun desberdinak egunero lantzeko.</p>
            <div class="game-preview">
              <div class="game-preview__item game-preview__item--hiztegle">
                <Puzzle /><span><strong>Hiztegle</strong><small>Asmatu hitza</small></span>
              </div>
              <div class="game-preview__item game-preview__item--sinonimoak">
                <Shuffle /><span><strong>Sinonimoak</strong><small>Aberastu hiztegia</small></span>
              </div>
              <div class="game-preview__item game-preview__item--aditzak">
                <MessageCircle /><span><strong>Aditzak</strong><small>Indartu aditz laguntzaileak</small></span>
              </div>
            </div>
          </template>

          <template v-else-if="currentSlide === 2">
            <div class="onboarding__feature-icon onboarding__feature-icon--progress" aria-hidden="true">
              <BarChart3 />
            </div>
            <p class="onboarding__eyebrow">Zure ikasketa</p>
            <h1>Baliabideak eta aurrerapena.</h1>
            <p class="onboarding__lead">Kontsultatu behar duzuna eta jarraitu zure eguneroko bilakaera.</p>
            <div class="resource-preview">
              <div><BookOpen /><span>Hiztegia</span></div>
              <div><Table /><span>Aditz taulak</span></div>
              <div><Languages /><span>Sinonimoak</span></div>
              <div><BarChart3 /><span>Estatistikak</span></div>
            </div>
          </template>

          <template v-else>
            <div class="onboarding__feature-icon onboarding__feature-icon--privacy" aria-hidden="true">
              <ShieldCheck />
            </div>
            <p class="onboarding__eyebrow">Zure pribatutasuna</p>
            <h1>Zure datuak, argi eta garbi.</h1>
            <p class="onboarding__lead">Jokatu! erabiltzean hau gertatzen da:</p>
            <ul class="privacy-list">
              <li>
                <span class="privacy-list__icon"><Database /></span>
                <span><strong>Aurrerapena gailuan</strong><small>Partidak eta estatistikak zure gailuan gordetzen dira.</small></span>
              </li>
              <li>
                <span class="privacy-list__icon"><BookOpen /></span>
                <span><strong>Hiztegiko kontsultak</strong><small>Kontsultatutako hitza idg.eus zerbitzarira bidaltzen da emaitza lortzeko.</small></span>
              </li>
              <li>
                <span class="privacy-list__icon"><ShieldCheck /></span>
                <span><strong>Jarraipenik ez</strong><small>Ez dugu erabilera-analitikarik jasotzen eta ez dugu publizitate-jarraipenik egiten.</small></span>
              </li>
            </ul>
          </template>
        </article>
      </Transition>
    </section>

    <footer class="onboarding__footer">
      <div class="onboarding__dots" :aria-label="`${currentSlide + 1}. pantaila, ${totalSlides} pantailatik`">
        <button
          v-for="index in totalSlides"
          :key="index"
          type="button"
          :class="{ 'is-active': currentSlide === index - 1 }"
          :aria-label="`${index}. pantailara joan`"
          :aria-current="currentSlide === index - 1 ? 'step' : undefined"
          @click="goTo(index - 1)"
        ></button>
      </div>

      <div class="onboarding__actions">
        <button
          v-if="!isFirst"
          class="onboarding__back"
          type="button"
          aria-label="Aurreko pantaila"
          @click="previous"
        >
          <ArrowLeft />
        </button>
        <button class="onboarding__next" type="button" @click="next">
          <template v-if="isLast">
            <Check /> {{ canClose ? 'Ulertu dut' : 'Ulertu dut, hasi' }}
          </template>
          <template v-else>
            Jarraitu <ArrowRight />
          </template>
        </button>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.onboarding {
  position: relative;
  display: grid;
  min-height: calc(100dvh - var(--safe-area-inset-top, env(safe-area-inset-top, 0px)));
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 18%, rgb(124 92 245 / 0.2), transparent 34%),
    linear-gradient(160deg, #21173D 0%, #1C1533 58%, #17102B 100%);
  color: #F6F4FC;
}

.onboarding__glow { position: absolute; border-radius: 50%; filter: blur(1px); pointer-events: none; }
.onboarding__glow--one { width: 18rem; height: 18rem; top: -10rem; right: -8rem; background: rgb(178 58 140 / 0.14); }
.onboarding__glow--two { width: 15rem; height: 15rem; bottom: -9rem; left: -7rem; background: rgb(18 136 136 / 0.11); }

.onboarding__header,
.onboarding__footer {
  position: relative;
  z-index: 2;
  width: min(100%, 52rem);
  margin-inline: auto;
  padding-inline: 1.25rem;
}

.onboarding__header { display: flex; min-height: 4.5rem; align-items: center; justify-content: space-between; }
.onboarding__brand { display: flex; align-items: center; gap: 0.55rem; font-size: 0.95rem; font-weight: 800; }
.onboarding__brand img { width: 1.65rem; height: 1.65rem; }
.onboarding__skip,
.onboarding__close { border: 0; color: #C6B7FF; background: transparent; font: inherit; font-size: 0.78rem; font-weight: 750; cursor: pointer; }
.onboarding__close { display: grid; width: 2.6rem; height: 2.6rem; place-items: center; border: 1px solid rgb(255 255 255 / 0.12); border-radius: 50%; background: rgb(255 255 255 / 0.06); }
.onboarding__close svg { width: 1.15rem; }

.onboarding__stage { position: relative; z-index: 1; display: grid; min-height: 0; place-items: center; padding: 0.5rem 1.25rem; }
.onboarding__slide { width: min(100%, 36rem); text-align: center; }
.onboarding__eyebrow { margin: 1.25rem 0 0.45rem; color: #BDAAFF; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
.onboarding h1 { margin: 0; font-size: clamp(1.75rem, 7vw, 3rem); font-weight: 800; letter-spacing: -0.045em; line-height: 1.08; }
.onboarding__lead { max-width: 31rem; margin: 0.9rem auto 0; color: #B7ACDA; font-size: clamp(0.82rem, 3.4vw, 1rem); line-height: 1.6; }

.welcome-mark { position: relative; width: 7.5rem; margin: 0 auto; padding: 0.65rem; border-radius: 50%; background: rgb(255 255 255 / 0.07); box-shadow: 0 0 0 1px rgb(255 255 255 / 0.09), 0 18px 55px rgb(108 76 241 / 0.38); }
.welcome-mark img { display: block; width: 100%; }
.welcome-mark__spark { position: absolute; color: #D9CBFF; }
.welcome-mark__spark--one { width: 1.35rem; top: -0.35rem; right: 0; }
.welcome-mark__spark--two { width: 0.85rem; bottom: 0.2rem; left: -0.45rem; }

.onboarding__feature-icon { display: grid; width: 5rem; height: 5rem; margin: 0 auto; place-items: center; border-radius: 1rem; box-shadow: 0 18px 40px rgb(7 4 18 / 0.24); transform: rotate(-3deg); }
.onboarding__feature-icon svg { width: 2.25rem; height: 2.25rem; }
.onboarding__feature-icon--games { background: linear-gradient(135deg, #A83583, #7C2D68); }
.onboarding__feature-icon--progress { background: linear-gradient(135deg, #7C5CF5, #5636C9); }
.onboarding__feature-icon--privacy { background: linear-gradient(135deg, #168E87, #0D6A6A); }

.game-preview { display: grid; gap: 0.5rem; max-width: 28rem; margin: 1.25rem auto 0; text-align: left; }
.game-preview__item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0.9rem; border: 1px solid rgb(255 255 255 / 0.1); border-radius: 0.5rem; color: white; box-shadow: 0 10px 24px rgb(7 4 18 / 0.15); }
.game-preview__item > svg { width: 1.25rem; flex: 0 0 auto; }
.game-preview__item span { display: flex; flex-direction: column; }
.game-preview__item strong { font-size: 0.8rem; }
.game-preview__item small { color: rgb(255 255 255 / 0.72); font-size: 0.65rem; }
.game-preview__item--hiztegle { background: #A83583; }
.game-preview__item--sinonimoak { background: #9B5E08; }
.game-preview__item--aditzak { background: #107B7B; }

.resource-preview { display: grid; max-width: 28rem; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; margin: 1.25rem auto 0; }
.resource-preview div { display: flex; min-height: 4.25rem; align-items: center; gap: 0.55rem; padding: 0.75rem; border: 1px solid rgb(255 255 255 / 0.1); border-radius: 0.5rem; background: #2A2147; color: #F6F4FC; font-size: 0.72rem; font-weight: 750; text-align: left; }
.resource-preview svg { width: 1.15rem; flex: 0 0 auto; color: #BDAAFF; }

.privacy-list { display: grid; max-width: 32rem; gap: 0.55rem; margin: 1.15rem auto 0; padding: 0; list-style: none; text-align: left; }
.privacy-list li { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem; border: 1px solid rgb(255 255 255 / 0.1); border-radius: 0.5rem; background: #2A2147; }
.privacy-list__icon { display: grid; width: 2rem; height: 2rem; flex: 0 0 auto; place-items: center; border-radius: 0.375rem; background: rgb(189 170 255 / 0.12); color: #BDAAFF; }
.privacy-list__icon svg { width: 1rem; }
.privacy-list li > span:last-child { display: flex; flex-direction: column; }
.privacy-list strong { font-size: 0.72rem; }
.privacy-list small { margin-top: 0.1rem; color: #B7ACDA; font-size: 0.62rem; line-height: 1.45; }

.onboarding__footer { padding-top: 0.75rem; padding-bottom: max(1.25rem, var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))); }
.onboarding__dots { display: flex; justify-content: center; gap: 0.4rem; margin-bottom: 0.85rem; }
.onboarding__dots button { width: 0.45rem; height: 0.45rem; padding: 0; border: 0; border-radius: 999px; background: rgb(255 255 255 / 0.22); cursor: pointer; transition: width 0.2s ease, background 0.2s ease; }
.onboarding__dots button.is-active { width: 1.4rem; background: #A993FF; }
.onboarding__actions { display: flex; max-width: 30rem; gap: 0.65rem; margin-inline: auto; }
.onboarding__back,
.onboarding__next { display: inline-flex; min-height: 3.25rem; align-items: center; justify-content: center; border: 0; border-radius: 0.5rem; color: white; font: inherit; font-size: 0.82rem; font-weight: 800; cursor: pointer; }
.onboarding__back { width: 3.25rem; flex: 0 0 auto; border: 1px solid rgb(255 255 255 / 0.14); background: rgb(255 255 255 / 0.07); }
.onboarding__next { flex: 1; gap: 0.45rem; background: #7C5CF5; box-shadow: inset 0 -4px 0 rgb(51 34 124 / 0.5), 0 12px 28px rgb(108 76 241 / 0.3); }
.onboarding__back svg,
.onboarding__next svg { width: 1.05rem; }
.onboarding__next:hover { background: #896DF8; }
.onboarding__next:active { transform: translateY(2px); box-shadow: inset 0 -2px 0 rgb(51 34 124 / 0.5); }

.slide-next-enter-active,
.slide-next-leave-active,
.slide-back-enter-active,
.slide-back-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.slide-next-enter-from { opacity: 0; transform: translateX(2rem); }
.slide-next-leave-to { opacity: 0; transform: translateX(-2rem); }
.slide-back-enter-from { opacity: 0; transform: translateX(-2rem); }
.slide-back-leave-to { opacity: 0; transform: translateX(2rem); }

button:focus-visible { outline: 3px solid #CCC0FA; outline-offset: 3px; }

@media (min-width: 640px) {
  .onboarding__header { min-height: 5.5rem; }
  .welcome-mark { width: 9rem; }
  .game-preview { grid-template-columns: repeat(3, 1fr); max-width: 40rem; }
  .game-preview__item { min-height: 6.5rem; align-items: flex-start; flex-direction: column; }
  .resource-preview { grid-template-columns: repeat(4, 1fr); max-width: 40rem; }
  .resource-preview div { min-height: 6rem; align-items: flex-start; flex-direction: column; justify-content: center; }
}

@media (max-height: 700px) {
  .onboarding__header { min-height: 3.75rem; }
  .welcome-mark { width: 5.5rem; }
  .onboarding__feature-icon { width: 3.75rem; height: 3.75rem; }
  .onboarding__feature-icon svg { width: 1.75rem; }
  .onboarding__eyebrow { margin-top: 0.65rem; }
  .onboarding__lead { margin-top: 0.55rem; }
  .game-preview,
  .resource-preview,
  .privacy-list { margin-top: 0.7rem; }
  .onboarding__footer { padding-top: 0.4rem; padding-bottom: max(0.75rem, var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))); }
  .onboarding__dots { margin-bottom: 0.5rem; }
}

@media (prefers-reduced-motion: reduce) {
  .slide-next-enter-active,
  .slide-next-leave-active,
  .slide-back-enter-active,
  .slide-back-leave-active { transition: none; }
}
</style>
