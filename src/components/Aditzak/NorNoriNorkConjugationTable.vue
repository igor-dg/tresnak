<template>
    <div class="w-full max-w-4xl mx-auto">
        <h3 class="text-[var(--text-primary)] font-semibold text-center mb-4">{{ TIEMPO_NAMES[tiempo] }}</h3>
        
        <!-- Selectors -->
        <div class="flex gap-4 mb-6">
            <!-- NOR (Number) Selector -->
            <div class="flex-1">
                <div class="relative">
                    <select 
                        v-model="selectedNumber"
                        class="input appearance-none pr-8 py-2"
                    >
                        <option value="" disabled selected>NOR</option>
                        <option value="singular">Hura (sing.)</option>
                        <option value="plural">Haiek (plur.)</option>
                    </select>
                    <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                </div>
            </div>

            <!-- NORI Selector -->
            <div class="flex-1">
                <div class="relative">
                    <select 
                        v-model="selectedNori"
                        class="input appearance-none pr-8 py-2"
                    >
                        <option value="" disabled selected>NORI</option>
                        <option v-for="nori in ['NIRI', 'HIRI', 'HARI', 'GURI', 'ZURI', 'ZUEI', 'HAIEI']" :key="nori" :value="nori">
                            {{ nori }}
                        </option>
                    </select>
                    <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                </div>
            </div>

            <!-- NORK Selector -->
            <div class="flex-1">
                <div class="relative">
                    <select 
                        v-model="selectedNork"
                        class="input appearance-none pr-8 py-2"
                    >
                        <option value="" disabled selected>NORK</option>
                        <option v-for="nork in ['NIK', 'HIK', 'HARK', 'GUK', 'ZUK', 'ZUEK', 'HAIEK']" :key="nork" :value="nork">
                            {{ nork }}
                        </option>
                    </select>
                    <ChevronDown class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                </div>
            </div>
        </div>

        <!-- Tables section -->
        <div class="relative overflow-x-auto card p-4">
            <div class="flex">
                <template v-for="tableType in conjugationData.tableOrder" :key="tableType">
                    <div :class="{'flex-1': tableType !== 'extraSuffix', 'flex-none': tableType === 'extraSuffix'}">
                        <table class="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th v-for="(header, index) in tableStructure[tableType].headers" 
                                        :key="index"
                                        :class="{
                                            'border p-2': true,
                                            'table-heading': index === tableStructure.primaryColumns?.[tableType],
                                            'table-subheading': index !== tableStructure.primaryColumns?.[tableType]
                                        }">
                                        {{ header || '\u00A0' }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(person, index) in Object.keys(mappings[tableType])" 
                                    :key="index"
                                    :class="{
                                        'table-highlight': getRowHighlight(tableType, person)
                                    }">
                                    <td v-for="column in tableStructure[tableType].showColumns"
                                        :key="column"
                                        class="border p-2 text-center text-[var(--text-secondary)]"
                                        :class="{
                                            'table-highlight': shouldHighlightCell(tableType, column, index, person)
                                        }">
                                        {{ mappings[tableType][person][column] || '-' }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
            </div>
        </div>

        <!-- Result -->
        <div v-if="showResult" class="mt-4 p-4 card p-4 text-center">
            <span class="font-bold text-[var(--text-primary)] text-lg">{{ conjugationResult }}</span>
        </div>
    </div>
</template>

<script setup>
import { ChevronDown } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { TIEMPO_NAMES } from '@/utils'
import { norNoriNorkSystem } from '@/data/conjugations/nor-nori-nork'
import aditzak from '@/data/aditzak.json'

const props = defineProps({
    tiempo: {
        type: String,
        default: 'orain'
    }
})

const selectedNumber = ref('')
const selectedNori = ref('')
const selectedNork = ref('')

const conjugationData = computed(() => {
    return norNoriNorkSystem.conjugations[props.tiempo] || norNoriNorkSystem.conjugations['orain']
})

const tableStructure = computed(() => {
    return conjugationData.value.tableStructure
})

const mappings = computed(() => {
    const baseMapping = {
        nor: conjugationData.value.norMappings,
        nori: conjugationData.value.noriMappings,
        nork: conjugationData.value.norkMappings
    }

    // Añadir extraSuffixMappings si existe en la configuración
    if (conjugationData.value.extraSuffixMappings) {
        baseMapping.extraSuffix = conjugationData.value.extraSuffixMappings
    }

    return baseMapping
})

function shouldHighlightCell(tableType, column, index, person) {
    if (tableType === 'nor') {
        return shouldHighlightNorColumn(column, index)
    }
    if (tableType === 'extraSuffix' && selectedNork.value) {
        return normalizeValue(selectedNork.value) === person
    }
    return false
}

function shouldHighlightNorColumn(columnType, index) {
    if (!selectedNumber.value) return false

    if (selectedNork.value) {
        const correspondingNor = getNorForNork(selectedNork.value)
        const currentNor = Object.keys(mappings.value.nor)[index]
        return currentNor === correspondingNor && (
            (selectedNumber.value === 'singular' && columnType === 'particle') ||
            (selectedNumber.value === 'plural')
        )
    } else {
        return selectedNumber.value === 'singular' ? 
            columnType === 'particle' : 
            true
    }
}

function getRowHighlight(tableType, person) {
    if (tableType === 'nori') {
        return normalizeValue(selectedNori.value) === person
    }
    if (tableType === 'nork') {
        return normalizeValue(selectedNork.value) === person
    }
    return false
}

function getNorForNork(nork) {
    const mapping = {
        'NIK': 'Ni',
        'HIK': 'Hi',
        'HARK': 'Hura',
        'GUK': 'Gu',
        'ZUK': 'Zu',
        'ZUEK': 'Zuek',
        'HAIEK': 'Haiek'
    }
    return mapping[nork] || null
}

const showResult = computed(() => {
    return selectedNumber.value && selectedNork.value && selectedNori.value
})

const conjugationResult = computed(() => {
    if (!showResult.value) return ''

    try {
        const nork = normalizeValue(selectedNork.value)
        const nori = normalizeValue(selectedNori.value)
        
        return conjugationData.value.results(
            selectedNumber.value,
            nori,
            nork,
            props.tiempo
        )
    } catch (error) {
        console.error('Error getting conjugation result:', error)
        return '---'
    }
})

function normalizeValue(value) {
    if (!value) return ''
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}
</script>
