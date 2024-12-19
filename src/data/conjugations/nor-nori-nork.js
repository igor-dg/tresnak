// src/data/conjugations/nor-nori-nork.js
import aditzak from '@/data/aditzak.json'
export const norNoriNorkSystem = {
    invalidCombinations: [
        
    ],
    conjugations: {
        orain: {
            type: 'regular',
            // Define el orden de las tablas
            tableOrder: ['nor', 'nori', 'nork'],
            tableStructure: {
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                nork: {
                    headers: ['NORK'],
                    showColumns: ['particle']
                }
            },
            // El resto de las mappings permanecen igual
            norMappings: {
                'Ni': { particle: 'DI', suffix: 'ZKI' },
                'Hi': { particle: 'DI', suffix: 'ZKI' },
                'Hura': { particle: 'DI', suffix: 'ZKI' },
                'Gu': { particle: 'DI', suffix: 'ZKI' },
                'Zu': { particle: 'DI', suffix: 'ZKI' },
                'Zuek': { particle: 'DI', suffix: 'ZKI' },
                'Haiek': { particle: 'DI', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'T/DA' },
                'Hiri': { particle: 'K/N' },
                'Hari': { particle: 'O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'E' }
            },
            norkMappings: {
                'Nik': { particle: 'T' },
                'Hik': { particle: 'K/N' },
                'Hark': { particle: '' },
                'Guk': { particle: 'GU' },
                'Zuk': { particle: 'ZU' },
                'Zuek': { particle: 'ZUE' },
                'Haiek': { particle: 'TE' }
            },           
            results: (selectedNumber, nori, nork, tiempo = 'orain') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        lehen: {
            type: 'regular',
            tableOrder: ['nork', 'nor', 'nori', 'extraSuffix'],
            tableStructure: {
                nork: {
                    headers: ['NORK'],
                    showColumns: ['particle']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                extraSuffix: {
                    headers: ['', ''],
                    showColumns: ['teSuffix', 'nSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 0,
                }
            },
            // Actualizamos los mappings para lehen incluyendo extraSuffixMappings
            norkMappings: {
                'Nik': { particle: 'N' },
                'Hik': { particle: 'H' },
                'Hark': { particle: 'Z' },
                'Guk': { particle: 'GEN' },
                'Zuk': { particle: 'ZEN' },
                'Zuek': { particle: 'ZEN' },
                'Haiek': { particle: 'Z' }
            },
            norMappings: {
                'Ni': { particle: 'I', suffix: 'ZKI' },
                'Hi': { particle: 'I', suffix: 'ZKI' },
                'Hura': { particle: 'I', suffix: 'ZKI' },
                'Gu': { particle: 'I', suffix: 'ZKI' },
                'Zu': { particle: 'I', suffix: 'ZKI' },
                'Zuek': { particle: 'I', suffix: 'ZKI' },
                'Haiek': { particle: 'I', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'T/DA' },
                'Hiri': { particle: 'A/NA' },
                'Hari': { particle: 'O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'E' }
            },
            extraSuffixMappings: {
                'Nik': { teSuffix: '', nSuffix: 'N' },
                'Hik': { teSuffix: '', nSuffix: 'N' },
                'Hark': { teSuffix: '', nSuffix: 'N' },
                'Guk': { teSuffix: '', nSuffix: 'N' },
                'Zuk': { teSuffix: '', nSuffix: 'N' },
                'Zuek': { teSuffix: 'TE', nSuffix: 'N' },
                'Haiek': { teSuffix: 'TE', nSuffix: 'N' }
            },                 
            results: (selectedNumber, nori, nork, tiempo = 'lehen') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        bal_hip: {
            type: 'regular',
            tableOrder: ['nork', 'nor', 'nori', 'extraSuffix'],
            tableStructure: {
                nork: {
                    headers: ['', 'NORK'],
                    showColumns: ['prefix', 'particle']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                extraSuffix: {
                    headers: [''],
                    showColumns: ['teSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 1,
                }
            },
            norkMappings: {
                'Nik': { prefix: 'BA', particle: 'N' },
                'Hik': { prefix: 'BA', particle: 'H' },
                'Hark': { prefix: 'BA', particle: 'L' },
                'Guk': { prefix: 'BA', particle: 'GEN' },
                'Zuk': { prefix: 'BA', particle: 'ZEN' },
                'Zuek': { prefix: 'BA', particle: 'ZEN' },
                'Haiek': { prefix: 'BA', particle: 'L' }
            },
            norMappings: {
                'Ni': { particle: 'I', suffix: 'ZKI' },
                'Hi': { particle: 'I', suffix: 'ZKI' },
                'Hura': { particle: 'I', suffix: 'ZKI' },
                'Gu': { particle: 'I', suffix: 'ZKI' },
                'Zu': { particle: 'I', suffix: 'ZKI' },
                'Zuek': { particle: 'I', suffix: 'ZKI' },
                'Haiek': { particle: 'I', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'T/DA' },
                'Hiri': { particle: 'K/N(A)' },
                'Hari': { particle: 'O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'E' }
            },
            extraSuffixMappings: {
                'Nik': { teSuffix: '' },
                'Hik': { teSuffix: '' },
                'Hark': { teSuffix: '' },
                'Guk': { teSuffix: '' },
                'Zuk': { teSuffix: '' },
                'Zuek': { teSuffix: 'TE' },
                'Haiek': { teSuffix: 'TE' }
            },                 
            results: (selectedNumber, nori, nork, tiempo = 'bal_hip') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        ond_or: {
            type: 'regular',
            tableOrder: ['nork', 'nor', 'nori', 'extraSuffix'],
            tableStructure: {
                nork: {
                    headers: ['NORK'],
                    showColumns: ['particle']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                extraSuffix: {
                    headers: ['', ''],
                    showColumns: ['keSuffix', 'teSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 0,
                }
            },
            norkMappings: {
                'Nik': { particle: 'N' },
                'Hik': { particle: 'H' },
                'Hark': { particle: 'L' },
                'Guk': { particle: 'GEN' },
                'Zuk': { particle: 'ZEN' },
                'Zuek': { particle: 'ZEN' },
                'Haiek': { particle: 'L' }
            },
            norMappings: {
                'Ni': { particle: 'I', suffix: 'ZKI' },
                'Hi': { particle: 'I', suffix: 'ZKI' },
                'Hura': { particle: 'I', suffix: 'ZKI' },
                'Gu': { particle: 'I', suffix: 'ZKI' },
                'Zu': { particle: 'I', suffix: 'ZKI' },
                'Zuek': { particle: 'I', suffix: 'ZKI' },
                'Haiek': { particle: 'I', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA' },
                'Hiri': { particle: 'A/NA' },
                'Hari': { particle: 'O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'E' }
            },
            extraSuffixMappings: {
                'Nik': { keSuffix: 'KE', teSuffix: '' },
                'Hik': { keSuffix: 'KE', teSuffix: '' },
                'Hark': { keSuffix: 'KE', teSuffix: '' },
                'Guk': { keSuffix: 'KE', teSuffix: '' },
                'Zuk': { keSuffix: 'KE', teSuffix: '' },
                'Zuek': { keSuffix: 'KE', teSuffix: 'TE' },
                'Haiek': { keSuffix : 'KE', teSuffix: 'TE' }
            },                 
            results: (selectedNumber, nori, nork, tiempo = 'ond_or') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        ond_leh: {
            type: 'regular',
            tableOrder: ['nork', 'nor', 'nori', 'extraSuffix'],
            tableStructure: {
                nork: {
                    headers: ['NORK'],
                    showColumns: ['particle']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                extraSuffix: {
                    headers: ['', '', ''],
                    showColumns: ['keSuffix', 'teSuffix', 'nSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 0,
                }
            },
            norkMappings: {
                'Nik': { particle: 'N' },
                'Hik': { particle: 'H' },
                'Hark': { particle: 'Z' },
                'Guk': { particle: 'GEN' },
                'Zuk': { particle: 'ZEN' },
                'Zuek': { particle: 'ZEN' },
                'Haiek': { particle: 'Z' }
            },
            norMappings: {
                'Ni': { particle: 'I', suffix: 'ZKI' },
                'Hi': { particle: 'I', suffix: 'ZKI' },
                'Hura': { particle: 'I', suffix: 'ZKI' },
                'Gu': { particle: 'I', suffix: 'ZKI' },
                'Zu': { particle: 'I', suffix: 'ZKI' },
                'Zuek': { particle: 'I', suffix: 'ZKI' },
                'Haiek': { particle: 'I', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA' },
                'Hiri': { particle: 'A/NA' },
                'Hari': { particle: 'O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'E' }
            },
            extraSuffixMappings: {
                'Nik': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Hik': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Hark': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Guk': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Zuk': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Zuek': { keSuffix: 'KE', teSuffix: 'TE', nSuffix: 'N' },
                'Haiek': { keSuffix : 'KE', teSuffix: 'TE', nSuffix: 'N' }
            },                 
            results: (selectedNumber, nori, nork, tiempo = 'ond_leh') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        ahal_or: {
            type: 'regular',
            tableOrder: ['nor', 'nori','extraSuffix', 'nork' ],
            tableStructure: {
                nork: {
                    headers: ['NORK'],
                    showColumns: ['particle']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                extraSuffix: {
                    headers: [''],
                    showColumns: ['keSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 0,
                }
            },
            norkMappings: {
                'Nik': { particle: 'T'},
                'Hik': { particle: 'K/N'},
                'Hark': { particle: ''},
                'Guk': { particle: 'GU'},
                'Zuk': { particle: 'ZU'},
                'Zuek': { particle: 'ZUE'},
                'Haiek': { particle: 'TE'}
            },
            norMappings: {
                'Ni': { particle: 'DIEZA', suffix: 'ZKI' },
                'Hi': { particle: 'DIEZA', suffix: 'ZKI' },
                'Hura': { particle: 'DIEZA', suffix: 'ZKI' },
                'Gu': { particle: 'DIEZA', suffix: 'ZKI' },
                'Zu': { particle: 'DIEZA', suffix: 'ZKI' },
                'Zuek': { particle: 'DIEZA', suffix: 'ZKI' },
                'Haiek': { particle: 'DIEZA', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA' },
                'Hiri': { particle: 'A/NA' },
                'Hari': { particle: 'O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'IE' }
            },
            extraSuffixMappings: {
                'Nik': { keSuffix: 'KE' },
                'Hik': { keSuffix: 'KE' },
                'Hark': { keSuffix: 'KE' },
                'Guk': { keSuffix: 'KE' },
                'Zuk': { keSuffix: 'KE' },
                'Zuek': { keSuffix: 'KE' },
                'Haiek': { keSuffix: 'KE' }
            },                 
            results: (selectedNumber, nori, nork, tiempo = 'ahal_or') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        ahal_leh: {
            type: 'regular',
            tableOrder: ['nork', 'nor', 'nori','extraSuffix' ],
            tableStructure: {
                nork: {
                    headers: ['NORK'],
                    showColumns: ['particle']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                extraSuffix: {
                    headers: ['', '', ''],
                    showColumns: ['keSuffix', 'teSuffix', 'nSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 0,
                }
            },
            norkMappings: {
                'Nik': {particle: 'N'},
                'Hik': {particle: 'H'},
                'Hark': {particle: 'Z'},
                'Guk': {particle: 'GEN'},
                'Zuk': {particle: 'ZEN'},
                'Zuek': {particle: 'ZEN'},
                'Haiek': {particle: 'Z'}
            },
            norMappings: {
                'Ni': { particle: 'IEZA', suffix: 'ZKI' },
                'Hi': { particle: 'IEZA', suffix: 'ZKI' },
                'Hura': { particle: 'IEZA', suffix: 'ZKI' },
                'Gu': { particle: 'IEZA', suffix: 'ZKI' },
                'Zu': { particle: 'IEZA', suffix: 'ZKI' },
                'Zuek': { particle: 'IEZA', suffix: 'ZKI' },
                'Haiek': { particle: 'IEZA', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA' },
                'Hiri': { particle: 'A/NA' },
                'Hari': { particle: 'IO' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'IE' }
            },
            extraSuffixMappings: {
                'Nik': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Hik': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Hark': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Guk': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Zuk': { keSuffix: 'KE', teSuffix: '', nSuffix: 'EN' },
                'Zuek': { keSuffix: 'KE', teSuffix: 'TE', nSuffix: 'N' },
                'Haiek': { keSuffix: 'KE', teSuffix: 'TE', nSuffix: 'N' }
            },                 
            results: (selectedNumber, nori, nork, tiempo = 'ahal_leh') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        ahal_hip: {
            type: 'regular',
            tableOrder: ['nork', 'nor', 'nori','extraSuffix' ],
            tableStructure: {
                nork: {
                    headers: ['NORK'],
                    showColumns: ['particle']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                extraSuffix: {
                    headers: ['', '', ''],
                    showColumns: ['keSuffix', 'teSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 0,
                }
            },
            norkMappings: {
                'Nik': {particle: 'N'},
                'Hik': {particle: 'H'},
                'Hark': {particle: 'L'},
                'Guk': {particle: 'GEN'},
                'Zuk': {particle: 'ZEN'},
                'Zuek': {particle: 'ZEN'},
                'Haiek': {particle: 'L'}
            },
            norMappings: {
                'Ni': { particle: 'IEZA', suffix: 'ZKI' },
                'Hi': { particle: 'IEZA', suffix: 'ZKI' },
                'Hura': { particle: 'IEZA', suffix: 'ZKI' },
                'Gu': { particle: 'IEZA', suffix: 'ZKI' },
                'Zu': { particle: 'IEZA', suffix: 'ZKI' },
                'Zuek': { particle: 'IEZA', suffix: 'ZKI' },
                'Haiek': { particle: 'IEZA', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA' },
                'Hiri': { particle: 'A/NA' },
                'Hari': { particle: 'IO' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'IE' }
            },
            extraSuffixMappings: {
                'Nik': { keSuffix: 'KE', teSuffix: '' },
                'Hik': { keSuffix: 'KE', teSuffix: '' },
                'Hark': { keSuffix: 'KE', teSuffix: '' },
                'Guk': { keSuffix: 'KE', teSuffix: '' },
                'Zuk': { keSuffix: 'KE', teSuffix: '' },
                'Zuek': { keSuffix: 'KE', teSuffix: 'TE' },
                'Haiek': { keSuffix: 'KE', teSuffix: 'TE' }
            },                 
            results: (selectedNumber, nori, nork, tiempo = 'ahal_hip') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        subj_or: {
            type: 'regular',
            tableOrder: ['nor', 'nori', 'nork' ],
            tableStructure: {
                nork: {
                    headers: ['NORK', ''],
                    showColumns: ['particle', 'suffix']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 0,
                }
            },
            norkMappings: {
                'Nik': { particle: 'DA', suffix: 'N' },
                'Hik': { particle: 'A/NA', suffix: 'N' },
                'Hark': { particle: '', suffix: 'N' },
                'Guk': { particle: 'GU', suffix: 'N' },
                'Zuk': { particle: 'ZU', suffix: 'N' },
                'Zuek': { particle: 'ZUE', suffix: 'N' },
                'Haiek': { particle: 'TE', suffix: 'N' }
            },
            norMappings: {
                'Ni': { particle: 'DIEZA', suffix: 'ZKI' },
                'Hi': { particle: 'DIEZA', suffix: 'ZKI' },
                'Hura': { particle: 'DIEZA', suffix: 'ZKI' },
                'Gu': { particle: 'DIEZA', suffix: 'ZKI' },
                'Zu': { particle: 'DIEZA', suffix: 'ZKI' },
                'Zuek': { particle: 'DIEZA', suffix: 'ZKI' },
                'Haiek': { particle: 'DIEZA', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA' },
                'Hiri': { particle: 'A/NA' },
                'Hari': { particle: '(i)O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: '(i)E' }
            },                
            results: (selectedNumber, nori, nork, tiempo = 'subj_or') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        subj_leh: {
            type: 'regular',
            tableOrder: ['nork', 'nor', 'nori', 'extraSuffix' ],
            tableStructure: {
                nork: {
                    headers: ['NORK'],
                    showColumns: ['particle']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },
                extraSuffix: {
                    headers: ['', ''],
                    showColumns: ['teSuffix', 'nSuffix']
                },                    
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 0,
                }
            },
            norkMappings: {
                'Nik': { particle: 'N' },
                'Hik': { particle: 'H' },
                'Hark': { particle: 'Z' },
                'Guk': { particle: 'GEN' },
                'Zuk': { particle: 'ZEN' },
                'Zuek': { particle: 'ZEN' },
                'Haiek': { particle: 'Z' }
            },
            norMappings: {
                'Ni': { particle: 'IEZA', suffix: 'ZKI' },
                'Hi': { particle: 'IEZA', suffix: 'ZKI' },
                'Hura': { particle: 'IEZA', suffix: 'ZKI' },
                'Gu': { particle: 'IEZA', suffix: 'ZKI' },
                'Zu': { particle: 'IEZA', suffix: 'ZKI' },
                'Zuek': { particle: 'IEZA', suffix: 'ZKI' },
                'Haiek': { particle: 'IEZA', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA' },
                'Hiri': { particle: 'A/NA' },
                'Hari': { particle: '(i)O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: '(i)E' }
            },
            extraSuffixMappings: {
                'Nik': { teSuffix: '', nSuffix: 'N' },
                'Hik': { teSuffix: '', nSuffix: 'N' },
                'Hark': { teSuffix: '', nSuffix: 'N' },
                'Guk': { teSuffix: '', nSuffix: 'N' },
                'Zuk': { teSuffix: '', nSuffix: 'N' },
                'Zuek': { teSuffix: 'TE', nSuffix: 'N' },
                'Haiek': { teSuffix: 'TE', nSuffix: 'N' }
            },
            results: (selectedNumber, nori, nork, tiempo = 'subj_leh') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        },
        agintera: {
            type: 'regular',
            tableOrder: ['nor', 'nori', 'nork' ],
            tableStructure: {
                nork: {
                    headers: ['NORK'],
                    showColumns: ['particle']
                },
                nor: {
                    headers: ['NOR', ''],
                    showColumns: ['particle', 'suffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle']
                },                   
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    nork: 0,
                }
            },
            norkMappings: {
                'Nik': { particle: '()'},
                'Hik': { particle: 'K/N'},
                'Hark': { particle: ''},
                'Guk': { particle: '()'},
                'Zuk': { particle: 'ZU'},
                'Zuek': { particle: 'ZUE'},
                'Haiek': { particle: 'TE'}
            },
            norMappings: {
                'Ni': { particle: '(B)IEZA', suffix: 'ZKI' },
                'Hi': { particle: '(B)IEZA', suffix: 'ZKI' },
                'Hura': { particle: '(B)IEZA', suffix: 'ZKI' },
                'Gu': { particle: '(B)IEZA', suffix: 'ZKI' },
                'Zu': { particle: '(B)IEZA', suffix: 'ZKI' },
                'Zuek': { particle: '(B)IEZA', suffix: 'ZKI' },
                'Haiek': { particle: '(B)IEZA', suffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': {particle: 'DA/T'},
                'Hiri': {particle: '(K/N)(A/NA)'},
                'Hari': {particle: '(i)O'},
                'Guri': {particle: 'GU'},
                'Zuri': {particle: 'ZU'},
                'Zuei': {particle: 'ZUE'},
                'Haiei': {particle: '(i)E'}
            },
            results: (selectedNumber, nori, nork, tiempo = 'agintera') => {
                try {
                    // Primero definimos la variable number
                    const number = selectedNumber === 'singular' ? 'Sing' : 'Plur'
                    // Normalizamos NORK y NORI
                    const normalizedNork = nork.toUpperCase()
                    const normalizedNori = nori.toUpperCase()
                    
                    console.log('Accessing path:', {
                        number,
                        nork: normalizedNork,
                        nori: normalizedNori,
                        tiempo
                    })
                    
                    const formas = aditzak.sistema["nor-nori-nork"][number][normalizedNork][normalizedNori][tiempo]
                    return Array.isArray(formas) ? formas.join(' / ') : formas
                } catch (error) {
                    console.error('Error getting conjugation:', {
                        error,
                        params: {
                            selectedNumber,
                            nori,
                            nork,
                            tiempo
                        }
                    })
                    return '---'
                }
            }
        }
    }
}