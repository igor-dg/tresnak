// src/data/conjugations/nor-nork.js
import aditzak from '@/data/aditzak.json'

export const norNorkSystem = {
    invalidCombinations: [
        { nor: 'Ni', nork: 'Nik' },
        { nor: 'Ni', nork: 'Guk' },
        { nor: 'Hi', nork: 'Hik' },
        { nor: 'Hi', nork: 'Zuek' },
        { nor: 'Gu', nork: 'Nik' },
        { nor: 'Gu', nork: 'Guk' },
        { nor: 'Zu', nork: 'Zuk' },
        { nor: 'Zu', nork: 'Hik' },
        { nor: 'Zu', nork: 'Zuek' },
        { nor: 'Zuek', nork: 'Zuk' },
        { nor: 'Zuek', nork: 'Hik' },
        { nor: 'Zuek', nork: 'Zuek' }
    ],
    conjugations: {
    orain: {
        type: 'regular',
        tableStructure: {
            nor: {
                headers: ['NOR', '', '', ''],
                showColumns: ['particle', 'suffix', 'uSuffix', 'zSuffix']
            },
            nork: {
                headers: ['NORK'],
                showColumns: ['particle']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        norMappings: {
            'Ni': { particle: 'NA', suffix: '', uSuffix: 'U', zSuffix: '' },
            'Hi': { particle: 'HA', suffix: '', uSuffix: 'U', zSuffix: '' },
            'Hura': { particle: 'D', suffix: '', uSuffix: 'U', zSuffix: '' },
            'Gu': { particle: 'GA', suffix: 'IT', uSuffix: 'U', zSuffix: '' },
            'Zu': { particle: 'ZA', suffix: 'IT', uSuffix: 'U', zSuffix: '(z)' },
            'Zuek': { particle: 'ZA', suffix: 'IT', uSuffix: 'U', zSuffix: 'ZTE' },
            'Haiek': { particle: 'D', suffix: 'IT', uSuffix: 'U', zSuffix: '(z)' }
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
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["orain"];
            return formas.join(' / ');
        }
    },
    lehen: {
        type: 'mixed',
        regularTableStructure: {
            nor: {
                headers: ['NOR', ''],
                showColumns: ['form', 'suffix']
            },
            nork: {
                headers: ['NORK', ''],
                showColumns: ['particle', 'suffix']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        regularNorMappings: {
            'Ni': { form: 'NIND', suffix: 'U' },
            'Hi': { form: 'HIND', suffix: 'U' },
            'Hura': { form: '', suffix: '' },
            'Gu': { form: 'GINT', suffix: 'U' },
            'Zu': { form: 'ZINT', suffix: 'U' },
            'Zuek': { form: 'ZINT', suffix: 'UZTE' },
            'Haiek': { form: '', suffix: '' }
        },
        regularNorkMappings: {
            'Nik': { particle: 'DA', suffix: 'N' },
            'Hik': { particle: 'A/NA', suffix: 'N' },
            'Hark': { particle: '', suffix: '(e)N' },
            'Guk': { particle: 'GU', suffix: 'N' },
            'Zuk': { particle: 'ZU', suffix: 'N' },
            'Zuek': { particle: 'ZUE', suffix: 'N' },
            'Haiek': { particle: '(z)TE', suffix: 'N' }
        },
        // Formas especiales para HURA
        huraForms: {
            'Nik': 'NUEN',
            'Hik': 'HUEN',
            'Hark': 'ZUEN',
            'Guk': 'GENUEN',
            'Zuk': 'ZENUEN',
            'Zuek': 'ZENUTEN',
            'Haiek': 'ZUTEN'
        },
        // Formas especiales para HAIEK
        haiekForms: {
            'Nik': 'NITUEN',
            'Hik': 'HITUEN',
            'Hark': 'ZITUEN',
            'Guk': 'GENITUEN',
            'Zuk': 'ZENITUEN',
            'Zuek': 'ZENITUZTEN',
            'Haiek': 'ZITUZTEN'
        },
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["lehen"];
            return formas.join(' / ');
        }
    },
    bal_hip: {
        type: 'mixed',
        regularTableStructure: {
            nor: {
                headers: ['NOR', '', '', ''],
                showColumns: ['prefix', 'form', 'suffix', 'zSuffix']
            },
            nork: {
                headers: ['NORK'],
                showColumns: ['particle']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        regularNorMappings: {
            'Ni': { prefix: 'BA', form: 'NIND', suffix: 'U', zSuffix: '' },
            'Hi': { prefix: 'BA', form: 'HIND', suffix: 'U', zSuffix: '' },
            'Hura': { prefix: '', form: '', suffix: '', zSuffix: '' },
            'Gu': { prefix: 'BA', form: 'GINT', suffix: 'U', zSuffix: '' },
            'Zu': { prefix: 'BA', form: 'ZINT', suffix: 'U', zSuffix: '' },
            'Zuek': { prefix: 'BA', form: 'ZINT', suffix: 'U', zSuffix: 'ZTE' },
            'Haiek': { prefix: '', form: '', suffix: '', zSuffix: '' }
        },
        regularNorkMappings: {
            'Nik': { particle: 'T'},
            'Hik': { particle: 'K/N'},
            'Hark': { particle: ''},
            'Guk': { particle: 'GU'},
            'Zuk': { particle: 'ZU'},
            'Zuek': { particle: 'ZUE'},
            'Haiek': { particle: 'TE'},
        },
        // Formas especiales para HURA
        huraForms: {
            'Nik': 'BANU',
            'Hik': 'BAHU',
            'Hark': 'BALU',
            'Guk': 'BAGENU',
            'Zuk': 'BAZENU',
            'Zuek': 'BAZENUTE',
            'Haiek': 'BAUTE'
        },
        // Formas especiales para HAIEK
        haiekForms: {
            'Nik': 'BANITU',
            'Hik': 'BAHITU',
            'Hark': 'BALITU',
            'Guk': 'BAGENITU',
            'Zuk': 'BAZENITU',
            'Zuek': 'BAZENITUZTE',
            'Haiek': 'BALITUZTE'
        },
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["bal_hip"];
            return formas.join(' / ');
        }
    },
    ond_or: {
        type: 'mixed',
        regularTableStructure: {
            nor: {
                headers: ['NOR', '', '', ''],
                showColumns: ['prefix', 'form', 'zSuffix', 'suffix']
            },
            nork: {
                headers: ['NORK'],
                showColumns: ['particle']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        regularNorMappings: {
            'Ni': { prefix: 'NIND', form: 'U', zSuffix: '', suffix: 'KE' },
            'Hi': { prefix: 'HIND', form: 'U', zSuffix: '', suffix: 'KE' },
            'Hura': { prefix: '', form: '', zSuffix: '', suffix: '' },
            'Gu': { prefix: 'GINT', form: 'U', zSuffix: 'Z', suffix: 'KE' },
            'Zu': { prefix: 'ZINT', form: 'U', zSuffix: 'Z', suffix: 'KE' },
            'Zuek': { prefix: 'ZINT', form: 'U', zSuffix: 'Z', suffix: 'KE(te)' },
            'Haiek': { prefix: '', form: '', zSuffix: '', suffix: '' }
        },
        regularNorkMappings: {
            'Nik': { particle: 'T' },
            'Hik': { particle: 'K/N' },
            'Hark': { particle: ''},
            'Guk': { particle: 'GU' },
            'Zuk': { particle: 'ZU' },
            'Zuek': { particle: 'ZUE' },
            'Haiek': { particle: 'TE' },
        },
        // Formas especiales para HURA
        huraForms: {
            'Nik': 'NUKE',
            'Hik': 'HUKE',
            'Hark': 'LUKE',
            'Guk': 'GENUKE',
            'Zuk': 'ZENUKE',
            'Zuek': 'ZENUKETE',
            'Haiek': 'LUKETE'
        },
        // Formas especiales para HAIEK
        haiekForms: {
            'Nik': 'NITUZKE',
            'Hik': 'HITUZKE',
            'Hark': 'LITUZKE',
            'Guk': 'GENITUZKE',
            'Zuk': 'ZENITUZKE',
            'Zuek': 'ZENITUZKETE',
            'Haiek': 'LITUZKETE'
        },
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["ond_or"];
            return formas.join(' / ');
        }
    },
    ond_leh: {
        type: 'mixed',
        regularTableStructure: {
            nor: {
                headers: ['NOR', '', ''],
                showColumns: ['prefix', 'form', 'suffix']
            },
            nork: {
                headers: ['NORK', ''],
                showColumns: ['prefix', 'particle']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        regularNorMappings: {
            'Ni': { prefix: 'NIND', form: 'U', suffix: 'KE' },
            'Hi': { prefix: 'HIND', form: 'U', suffix: 'KE' },
            'Hura': { prefix: '', form: '', suffix: '' },
            'Gu': { prefix: 'GINT', form: 'UZ', suffix: 'KE' },
            'Zu': { prefix: 'ZINT', form: 'UZ', suffix: 'KE' },
            'Zuek': { prefix: 'ZINT', form: 'UZ', suffix: 'KETE' },
            'Haiek': { prefix: '', form: '', suffix: 'KE' }
        },
        regularNorkMappings: {
            'Nik': { prefix: 'DA', particle: 'N' },
            'Hik': { prefix: 'A/NA', particle: 'N' },
            'Hark': { prefix: '', particle: 'EN' },
            'Guk': { prefix: 'GU', particle: 'N' },
            'Zuk': { prefix: 'ZU', particle: 'N' },
            'Zuek': { prefix: 'ZUE', particle: 'N' },
            'Haiek': { prefix: 'TE', particle: 'N' }
        },
        // Formas especiales para HURA
        huraForms: {
            'Nik': 'NUKEEN',
            'Hik': 'HUKEEN',
            'Hark': 'ZUKEEN',
            'Guk': 'GENUKEEN',
            'Zuk': 'ZENUKEEN',
            'Zuek': 'ZENUKETEN',
            'Haiek': 'ZUKETEN'
        },
        // Formas especiales para HAIEK
        haiekForms: {
            'Nik': 'NITUZKEEN',
            'Hik': 'HITUZKEEN',
            'Hark': 'ZITUZKEEN',
            'Guk': 'GENITUZKEEN',
            'Zuk': 'ZENITUZKEEN',
            'Zuek': 'ZENITUZKETEN',
            'Haiek': 'ZITUZKETEN'
        },
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["ond_leh"];
            return formas.join(' / ');
        }
    },
    ahal_or: {
        type: 'regular',
        tableStructure: {
            nor: {
                headers: ['NOR', '', '', ''],
                showColumns: ['form', 'particle', 'suffix', 'tSuffix']
            },
            nork: {
                headers: ['NORK'],
                showColumns: ['particle']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        norMappings: {
            'Ni': { form: 'NA', particle: '', suffix: 'ZAKE', tSuffix: '' },
            'Hi': { form: 'HA', particle: '', suffix: 'ZAKE', tSuffix: '' },
            'Hura': { form: 'DE', particle: '', suffix: 'ZAKE', tSuffix: '' },
            'Gu': { form: 'GA', particle: 'IT', suffix: 'ZAKE', tSuffix: '' },
            'Zu': { form: 'ZA', particle: 'IT', suffix: 'ZAKE', tSuffix: '' },
            'Zuek': { form: 'ZA', particle: 'IT', suffix: 'ZAKE', tSuffix: 'TE' },
            'Haiek': { form: 'D', particle: 'IT', suffix: 'ZAKE', tSuffix: '' }
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
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["ahal_or"];
            return formas.join(' / ');
        }
    },
    ahal_leh: {
        type: 'mixed',
        regularTableStructure: {
            nor: {
                headers: ['NOR', '', ''],
                showColumns: ['prefix', 'form', 'suffix']
            },
            nork: {
                headers: ['NORK', ''],
                showColumns: ['particle', 'suffix']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        regularNorMappings: {
            'Ni': { prefix: 'NINT', form: 'ZAKE', suffix: '' },
            'Hi': { prefix: 'HINT', form: 'ZAKE', suffix: '' },
            'Hura': { prefix: '', form: '', suffix: '' },
            'Gu': { prefix: 'GINT', form: 'ZAKE', suffix: '' },
            'Zu': { prefix: 'ZINT', form: 'ZAKE', suffix: '' },
            'Zuek': { prefix: 'ZINT', form: 'ZAKE', suffix: 'TE' },
            'Haiek': { prefix: '', form: '', suffix: '' }
        },
        regularNorkMappings: {
            'Nik': { particle: 'DA', suffix: 'N' },
            'Hik': { particle: 'A/NA', suffix: 'N' },
            'Hark': { particle: '', suffix: '(e)N' },
            'Guk': { particle: 'GU', suffix: 'N' },
            'Zuk': { particle: 'ZU', suffix: 'N' },
            'Zuek': { particle: 'ZUE', suffix: 'N' },
            'Haiek': { particle: 'TE', suffix: 'N' }
        },
        // Formas especiales para HURA
        huraForms: {
            'Nik': 'NEZAKEEN',
            'Hik': 'HEZAKEEN',
            'Hark': 'ZEZAKEEN',
            'Guk': 'GENEZAKEEN',
            'Zuk': 'ZENEZAKEEN',
            'Zuek': 'ZENEZAKETEN',
            'Haiek': 'ZEZAKETEN'
        },
        // Formas especiales para HAIEK
        haiekForms: {
            'Nik': 'NITZAKEEN',
            'Hik': 'HITZAKEEN',
            'Hark': 'ZITZAKEEN',
            'Guk': 'GENITZAKEEN',
            'Zuk': 'ZENITZAKEEN',
            'Zuek': 'ZENITZAKETEN',
            'Haiek': 'ZITZAKETEN'
        },
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["ahal_leh"];
            return formas.join(' / ');
        }
    },
    ahal_hip: {
        type: 'mixed',
        regularTableStructure: {
            nor: {
                headers: ['NOR', '', ''],
                showColumns: ['prefix', 'form', 'suffix']
            },
            nork: {
                headers: ['NORK'],
                showColumns: ['particle']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        regularNorMappings: {
            'Ni': { prefix: 'NINT', form: 'ZAKE', suffix: '' },
            'Hi': { prefix: 'HINT', form: 'ZAKE', suffix: '' },
            'Hura': { prefix: '', form: '', suffix: '' },
            'Gu': { prefix: 'GINT', form: 'ZAKE', suffix: '' },
            'Zu': { prefix: 'ZINT', form: 'ZAKE', suffix: '' },
            'Zuek': { prefix: 'ZINT', form: 'ZAKE', suffix: 'TE' },
            'Haiek': { prefix: '', form: '', suffix: '' }
        },
        regularNorkMappings: {
            'Nik': { particle: 'T' },
            'Hik': { particle: 'K/N' },
            'Hark': { particle: '' },
            'Guk': { particle: 'GU' },
            'Zuk': { particle: 'ZU' },
            'Zuek': { particle: 'ZUE' },
            'Haiek': { particle: 'TE' }
        },
        // Formas especiales para HURA
        huraForms: {
            'Nik': 'NEZAKE',
            'Hik': 'HEZAKE',
            'Hark': 'LEZAKE',
            'Guk': 'GENEZAKE',
            'Zuk': 'ZENEZAKE',
            'Zuek': 'ZENEZAKETE',
            'Haiek': 'LEZAKETE'
        },
        // Formas especiales para HAIEK
        haiekForms: {
            'Nik': 'NITZAKE',
            'Hik': 'HITZAKE',
            'Hark': 'LITZAKE',
            'Guk': 'GENITZAKE',
            'Zuk': 'ZENITZAKE',
            'Zuek': 'ZENITZAKETE',
            'Haiek': 'LITZAKETE'
        },
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["ahal_hip"];
            return formas.join(' / ');
        }
    },
    subj_or: {
        type: 'regular',
        tableStructure: {
            nor: {
                headers: ['NOR', '', '', ''],
                showColumns: ['form', 'particle', 'suffix', 'tSuffix']
            },
            nork: {
                headers: ['NORK', ''],
                showColumns: ['particle', 'suffix']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        norMappings: {
            'Ni': { form: 'NA', 'particle': '', suffix: 'ZA', tSuffix: '' },
            'Hi': { form: 'HA', 'particle': '', suffix: 'ZA', tSuffix: '' },
            'Hura': { form: 'DE', 'particle': '', suffix: 'ZA', tSuffix: '' },
            'Gu': { form: 'GA', 'particle': 'IT', suffix: 'ZA', tSuffix: '' },
            'Zu': { form: 'ZA', 'particle': 'IT', suffix: 'ZA', tSuffix: '' },
            'Zuek': { form: 'ZA', 'particle': 'IT', suffix: 'ZA', tSuffix: 'TE' },
            'Haiek': { form: 'D', 'particle': 'IT', suffix: 'ZA', tSuffix: '' }
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
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["subj_or"];
            return formas.join(' / ');
        }
    },
    subj_leh: {
        type: 'mixed',
        regularTableStructure: {
            nor: {
                headers: ['NOR', '', ''],
                showColumns: ['prefix', 'form', 'suffix']
            },
            nork: {
                headers: ['NORK', ''],
                showColumns: ['particle', 'suffix']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        regularNorMappings: {
            'Ni': { prefix: 'NINT', form: 'ZA', suffix: '' },
            'Hi': { prefix: 'HINT', form: 'ZA', suffix: '' },
            'Hura': { prefix: '', form: '', suffix: '' },
            'Gu': { prefix: 'GINT', form: 'ZA', suffix: '' },
            'Zu': { prefix: 'ZINT', form: 'ZA', suffix: '' },
            'Zuek': { prefix: 'ZINT', form: 'ZA', suffix: 'TE' },
            'Haiek': { prefix: '', form: '', suffix: '' }
        },
        regularNorkMappings: {
            'Nik': { particle: 'DA', suffix: 'N' },
            'Hik': { particle: 'A/NA', suffix: 'N' },
            'Hark': { particle: '', suffix: 'N' },
            'Guk': { particle: 'GU', suffix: 'N' },
            'Zuk': { particle: 'ZU', suffix: 'N' },
            'Zuek': { particle: 'ZUE', suffix: 'N' },
            'Haiek': { particle: 'TE', suffix: 'N' }
        },
        // Formas especiales para HURA
        huraForms: {
            'Nik': 'NEZAN',
            'Hik': 'HEZAN',
            'Hark': 'ZEZAN',
            'Guk': 'GENEZAN',
            'Zuk': 'ZENEZAN',
            'Zuek': 'ZENEZATEN',
            'Haiek': 'ZEZATEN'
        },
        // Formas especiales para HAIEK
        haiekForms: {
            'Nik': 'NITZAN',
            'Hik': 'HITZAN',
            'Hark': 'ZITZAN',
            'Guk': 'GENITZAN',
            'Zuk': 'ZENITZAN',
            'Zuek': 'ZENITZATEN',
            'Haiek': 'ZITZATEN'
        },
        results: (nor, nork) => {
            // Normalizar nor y nork para buscar en el JSON
            const formas = aditzak.sistema["nor-nork"][nor][nork]["subj_leh"];
            return formas.join(' / ');
        }
    },
    agintera: {
        type: 'regular',
        tableStructure: {
            nor: {
                headers: ['NOR', '', ''],
                showColumns: ['form', 'particle', 'suffix']
            },
            nork: {
                headers: ['NORK'],
                showColumns: ['particle']
            },
            primaryColumns: {
                nor: 0,  // índice de la columna NOR principal
                nork: 0  // índice de la columna NORK principal
            }
        },
        // Para NOR regular (Ni, Hi, Gu, Zu, Zuek)
        norMappings: {
            'Ni': { form: 'NA', particle: '', suffix: 'ZA' },
            'Hi': { form: '', particle: '', suffix: '' },
            'Hura': { form: 'BE', particle: '', suffix: 'ZA' },
            'Gu': { form: 'GA', particle: 'IT', suffix: 'ZA' },
            'Zu': { form: '(za)', particle: '(it)', suffix: '(za)' },
            'Zuek': { form: '(za)', particle: '(it)', suffix: '(zate)' },
            'Haiek': { form: 'B', particle: 'IT', suffix: 'ZA'},
        },
        norkMappings: {
            'Nik': { particle: '(t)' },
            'Hik': { particle: 'K/N' },
            'Hark': { particle: '' },
            'Guk': { particle: '(gu)' },
            'Zuk': { particle: 'ZU' },
            'Zuek': { particle: 'ZUE' },
            'Haiek': { particle: 'TE' }
        },
        results: (nor, nork) => {
            try {
                const formas = aditzak.sistema["nor-nork"][nor][nork]["agintera"];
                return formas ? formas.join(' / ') : '---';
            } catch {
                return '---';
            }
        }
    }
}
}