// src/data/conjugations/nor-nori.js
import aditzak from '@/data/aditzak.json'

export const norNoriSystem = {
    invalidCombinations: [
        { nor: 'Ni', nori: 'Niri' },
        { nor: 'Ni', nori: 'Guri' },
        { nor: 'Hi', nori: 'Hiri' },
        { nor: 'Hi', nori: 'Zuri' },
        { nor: 'Hi', nori: 'Zuei' },
        { nor: 'Gu', nori: 'Niri' },
        { nor: 'Gu', nori: 'Guri' },
        { nor: 'Zu', nori: 'Hiri' },
        { nor: 'Zu', nori: 'Zuri' },
        { nor: 'Zu', nori: 'Zuei' },
        { nor: 'Zuek', nori: 'Hiri' },
        { nor: 'Zuek', nori: 'Zuri' },
        { nor: 'Zuek', nori: 'Zuei' }
    ],
    conjugations: {
        orain: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: ['NOR', '', ''],
                    showColumns: ['particle', 'suffix', 'zSuffix']
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
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: 'NA', suffix: 'TZAI', zSuffix: '' },
                'Hi': { particle: 'HA', suffix: 'TZAI', zSuffix: '' },
                'Hura': { particle: '', suffix: 'ZAI', zSuffix: '' },
                'Gu': { particle: 'GA', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZA', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZA', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Haiek': { particle: '', suffix: 'ZAI', zSuffix: 'ZKI' }
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
            extraSuffixMappings: {
                'Ni': { teSuffix: '' },
                'Hi': { teSuffix: '' },
                'Hura': { teSuffix: '' },
                'Gu': { teSuffix: '' },
                'Zu': { teSuffix: '' },
                'Zuek': { teSuffix: 'TE' },
                'Haiek': { teSuffix: '' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["orain"];
                return formas.join(' / ');
            }
        },
        lehen: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: ['NOR', '', ''],
                    showColumns: ['particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle',]
                },
                extraSuffix: {
                    headers: ['', ''],  // Dos columnas vacías: una para 'te' y otra para 'n'
                    showColumns: ['teSuffix', 'nSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: 'NIN', suffix: 'TZAI', zSuffix: '' },
                'Hi': { particle: 'HIN', suffix: 'TZAI', zSuffix: '' },
                'Hura': { particle: 'ZI', suffix: 'TZAI', zSuffix: '' },
                'Gu': { particle: 'GIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Haiek': { particle: 'ZI', suffix: 'ZAI', zSuffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA'},
                'Hiri': { particle: 'A/NA' },
                'Hari': { particle: 'O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'E' }
            },
            extraSuffixMappings: {
                'Ni': { teSuffix: '', nSuffix: 'N' },
                'Hi': { teSuffix: '', nSuffix: 'N' },
                'Hura': { teSuffix: '', nSuffix: 'N' },
                'Gu': { teSuffix: '', nSuffix: 'N' },
                'Zu': { teSuffix: '', nSuffix: 'N' },
                'Zuek': { teSuffix: 'TE', nSuffix: 'N' },
                'Haiek': { teSuffix: '', nSuffix: 'N' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["lehen"];
                return formas.join(' / ');
            }
        },
        bal_hip: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: ['', 'NOR', '', ''],
                    showColumns: ['preffix', 'particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI'],
                    showColumns: ['particle',]
                },
                extraSuffix: {
                    headers: [''],
                    showColumns: ['teSuffix']
                },
                primaryColumns: {
                    nor: 1,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { preffix: 'BA', particle: 'NIN', suffix: 'TZAI', zSuffix: '' },
                'Hi': { preffix: 'BA', particle: 'HIN', suffix: 'TZAI', zSuffix: '' },
                'Hura': { preffix: 'BA', particle: 'LI', suffix: 'TZAI', zSuffix: '' },
                'Gu': { preffix: 'BA', particle: 'GIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zu': { preffix: 'BA', particle: 'ZIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zuek': { preffix: 'BA', particle: 'ZIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Haiek': { preffix: 'BA', particle: 'LI', suffix: 'ZAI', zSuffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'T/DA'},
                'Hiri': { particle: 'K/N' },
                'Hari': { particle: 'O' },
                'Guri': { particle: 'GU' },
                'Zuri': { particle: 'ZU' },
                'Zuei': { particle: 'ZUE' },
                'Haiei': { particle: 'E' }
            },
            extraSuffixMappings: {
                'Ni': { teSuffix: '' },
                'Hi': { teSuffix: '' },
                'Hura': { teSuffix: '' },
                'Gu': { teSuffix: '' },
                'Zu': { teSuffix: '' },
                'Zuek': { teSuffix: 'TE' },
                'Haiek': { teSuffix: '' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["bal_hip"];
                return formas.join(' / ');
            }
        },
        ond_or: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: [ 'NOR', '', '' ],
                    showColumns: [ 'particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI', '' ],
                    showColumns: ['particle', 'suffix']
                },
                extraSuffix: {
                    headers: [''],
                    showColumns: ['teSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: 'NIN', suffix: 'TZAI', zSuffix: '' },
                'Hi': { particle: 'HIN', suffix: 'TZAI', zSuffix: '' },
                'Hura': { particle: 'LI', suffix: 'TZAI', zSuffix: '' },
                'Gu': { particle: 'GIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Haiek': { particle: 'LI', suffix: 'TZAI', zSuffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA', suffix: 'KE' },
                'Hiri': { particle: 'A/NA', suffix: 'KE' },
                'Hari': { particle: 'O', suffix: 'KE' },
                'Guri': { particle: 'GU', suffix: 'KE' },
                'Zuri': { particle: 'ZU', suffix: 'KE' },
                'Zuei': { particle: 'ZUE', suffix: 'KE' },
                'Haiei': { particle: 'E', suffix: 'KE' }
            },
            extraSuffixMappings: {
                'Ni': { teSuffix: '' },
                'Hi': { teSuffix: '' },
                'Hura': { teSuffix: '' },
                'Gu': { teSuffix: '' },
                'Zu': { teSuffix: '' },
                'Zuek': { teSuffix: 'TE' },
                'Haiek': { teSuffix: '' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["ond_or"];
                return formas.join(' / ');
            }
        },
        ond_leh: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: [ 'NOR', '', '' ],
                    showColumns: [ 'particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI', '' ],
                    showColumns: ['particle', 'suffix']
                },
                extraSuffix: {
                    headers: ['', ''],
                    showColumns: ['teSuffix', 'nSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: 'NIN', suffix: 'TZAI', zSuffix: '' },
                'Hi': { particle: 'HIN', suffix: 'TZAI', zSuffix: '' },
                'Hura': { particle: 'LI', suffix: 'TZAI', zSuffix: '' },
                'Gu': { particle: 'GIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZIN', suffix: 'TZAI', zSuffix: 'ZKI' },
                'Haiek': { particle: 'LI', suffix: 'TZAI', zSuffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA', suffix: 'KE' },
                'Hiri': { particle: 'A/NA', suffix: 'KE' },
                'Hari': { particle: 'O', suffix: 'KE' },
                'Guri': { particle: 'GU', suffix: 'KE' },
                'Zuri': { particle: 'ZU', suffix: 'KE' },
                'Zuei': { particle: 'ZUE', suffix: 'KE' },
                'Haiei': { particle: 'E', suffix: 'KE' }
            },
            extraSuffixMappings: {
                'Ni': { teSuffix: '', nSuffix: 'EN' },
                'Hi': { teSuffix: '', nSuffix: 'EN' },
                'Hura': { teSuffix: '', nSuffix: 'EN' },
                'Gu': { teSuffix: '', nSuffix: 'EN' },
                'Zu': { teSuffix: '', nSuffix: 'EN' },
                'Zuek': { teSuffix: 'TE', nSuffix: 'N' },
                'Haiek': { teSuffix: '', nSuffix: 'EN' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["ond_leh"];
                return formas.join(' / ');
            }
        },
        ahal_or: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: [ 'NOR', '', '' ],
                    showColumns: [ 'particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI', '' ],
                    showColumns: ['particle', 'suffix']
                },
                extraSuffix: {
                    headers: [''],
                    showColumns: ['teSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: 'NA', suffix: 'KI', zSuffix: '' },
                'Hi': { particle: 'HA', suffix: 'KI', zSuffix: '' },
                'Hura': { particle: 'DA', suffix: 'KI', zSuffix: '' },
                'Gu': { particle: 'GA', suffix: 'KI', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZA', suffix: 'KI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZA', suffix: 'KI', zSuffix: 'ZKI' },
                'Haiek': { particle: 'DA', suffix: 'KI', zSuffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA', suffix: 'KE' },
                'Hiri': { particle: 'A/NA', suffix: 'KE' },
                'Hari': { particle: 'O', suffix: 'KE' },
                'Guri': { particle: 'GU', suffix: 'KE' },
                'Zuri': { particle: 'ZU', suffix: 'KE' },
                'Zuei': { particle: 'ZUE', suffix: 'KE' },
                'Haiei': { particle: 'E', suffix: 'KE' }
            },
            extraSuffixMappings: {
                'Ni': { teSuffix: '' },
                'Hi': { teSuffix: '' },
                'Hura': { teSuffix: '' },
                'Gu': { teSuffix: '' },
                'Zu': { teSuffix: '' },
                'Zuek': { teSuffix: 'TE' },
                'Haiek': { teSuffix: '' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["ahal_or"];
                return formas.join(' / ');
            }
        },
        ahal_leh: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: [ 'NOR', '', '' ],
                    showColumns: [ 'particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI', '' ],
                    showColumns: ['particle', 'suffix']
                },
                extraSuffix: {
                    headers: ['', ''],
                    showColumns: ['teSuffix', 'nSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: 'NEN', suffix: 'KI', zSuffix: '' },
                'Hi': { particle: 'HEN', suffix: 'KI', zSuffix: '' },
                'Hura': { particle: 'ZE', suffix: 'KI', zSuffix: '' },
                'Gu': { particle: 'GEN', suffix: 'KI', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZEN', suffix: 'KI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZEN', suffix: 'KI', zSuffix: 'ZKI' },
                'Haiek': { particle: 'ZE', suffix: 'KI', zSuffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA', suffix: 'KE' },
                'Hiri': { particle: 'A/NA', suffix: 'KE' },
                'Hari': { particle: 'O', suffix: 'KE' },
                'Guri': { particle: 'GU', suffix: 'KE' },
                'Zuri': { particle: 'ZU', suffix: 'KE' },
                'Zuei': { particle: 'ZUE', suffix: 'KE' },
                'Haiei': { particle: 'E', suffix: 'KE' }
            },
            extraSuffixMappings: {
                'Ni': { teSuffix: '', nSuffix: 'EN' },
                'Hi': { teSuffix: '', nSuffix: 'EN' },
                'Hura': { teSuffix: '', nSuffix: 'EN' },
                'Gu': { teSuffix: '', nSuffix: 'EN' },
                'Zu': { teSuffix: '', nSuffix: 'EN' },
                'Zuek': { teSuffix: 'TE', nSuffix: 'N' },
                'Haiek': { teSuffix: '', nSuffix: 'EN' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["ahal_leh"];
                return formas.join(' / ');
            }
        },
        ahal_hip: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: [ 'NOR', '', '' ],
                    showColumns: [ 'particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI', '' ],
                    showColumns: ['particle', 'suffix']
                },
                extraSuffix: {
                    headers: [''],
                    showColumns: ['teSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: 'NEN', suffix: 'KI', zSuffix: '' },
                'Hi': { particle: 'HEN', suffix: 'KI', zSuffix: '' },
                'Hura': { particle: 'LE', suffix: 'KI', zSuffix: '' },
                'Gu': { particle: 'GEN', suffix: 'KI', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZEN', suffix: 'KI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZEN', suffix: 'KI', zSuffix: 'ZKI' },
                'Haiek': { particle: 'LE', suffix: 'KI', zSuffix: 'ZKI' }
            },
            noriMappings: {
                'Niri': { particle: 'DA', suffix: 'KE' },
                'Hiri': { particle: 'A/NA', suffix: 'KE' },
                'Hari': { particle: 'O', suffix: 'KE' },
                'Guri': { particle: 'GU', suffix: 'KE' },
                'Zuri': { particle: 'ZU', suffix: 'KE' },
                'Zuei': { particle: 'ZUE', suffix: 'KE' },
                'Haiei': { particle: 'E', suffix: 'KE' }
            },
            extraSuffixMappings: {
                'Ni': { teSuffix: '' },
                'Hi': { teSuffix: '' },
                'Hura': { teSuffix: '' },
                'Gu': { teSuffix: '' },
                'Zu': { teSuffix: '' },
                'Zuek': { teSuffix: 'TE' },
                'Haiek': { teSuffix: '' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["ahal_hip"];
                return formas.join(' / ');
            }
        },
        subj_or: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: [ 'NOR', '', '' ],
                    showColumns: [ 'particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI' ],
                    showColumns: ['particle' ]
                },
                extraSuffix: {
                    headers: ['', ''],
                    showColumns: ['teSuffix', 'nSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: 'NA', suffix: 'KI', zSuffix: '' },
                'Hi': { particle: 'HA', suffix: 'KI', zSuffix: '' },
                'Hura': { particle: 'DA', suffix: 'KI', zSuffix: '' },
                'Gu': { particle: 'GA', suffix: 'KI', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZA', suffix: 'KI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZA', suffix: 'KI', zSuffix: 'ZKI' },
                'Haiek': { particle: 'DA', suffix: 'KI', zSuffix: 'ZKI' }
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
                'Ni': { teSuffix: '', nSuffix: 'N' },
                'Hi': { teSuffix: '', nSuffix: 'N' },
                'Hura': { teSuffix: '', nSuffix: 'N' },
                'Gu': { teSuffix: '', nSuffix: 'N' },
                'Zu': { teSuffix: '', nSuffix: 'N' },
                'Zuek': { teSuffix: 'TE', nSuffix: 'N' },
                'Haiek': { teSuffix: '', nSuffix: 'N' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["subj_or"];
                return formas.join(' / ');
            }
        },
        subj_leh: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: [ 'NOR', '', '' ],
                    showColumns: [ 'particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI' ],
                    showColumns: ['particle' ]
                },
                extraSuffix: {
                    headers: ['', ''],
                    showColumns: ['teSuffix', 'nSuffix']
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: 'NEN', suffix: 'KI', zSuffix: '' },
                'Hi': { particle: 'HEN', suffix: 'KI', zSuffix: '' },
                'Hura': { particle: 'ZE', suffix: 'KI', zSuffix: '' },
                'Gu': { particle: 'GEN', suffix: 'KI', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZEN', suffix: 'KI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZEN', suffix: 'KI', zSuffix: 'ZKI' },
                'Haiek': { particle: 'ZE', suffix: 'KI', zSuffix: 'ZKI' }
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
                'Ni': { teSuffix: '', nSuffix: 'N' },
                'Hi': { teSuffix: '', nSuffix: 'N' },
                'Hura': { teSuffix: '', nSuffix: 'N' },
                'Gu': { teSuffix: '', nSuffix: 'N' },
                'Zu': { teSuffix: '', nSuffix: 'N' },
                'Zuek': { teSuffix: 'TE', nSuffix: 'N' },
                'Haiek': { teSuffix: '', nSuffix: 'N' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["subj_leh"];
                return formas.join(' / ');
            }
        },
        agintera: {
            type: 'regular',
            tableStructure: {
                nor: {
                    headers: [ 'NOR', '', '' ],
                    showColumns: [ 'particle', 'suffix', 'zSuffix']
                },
                nori: {
                    headers: ['NORI' ],
                    showColumns: ['particle' ]
                },
                extraSuffix: {
                    headers: [''],
                    showColumns: ['teSuffix' ]
                },
                primaryColumns: {
                    nor: 0,
                    nori: 0,
                    extraSuffix: 0
                }
            },
            norMappings: {
                'Ni': { particle: '', suffix: '', zSuffix: '' },
                'Hi': { particle: 'HA', suffix: 'KI', zSuffix: '' },
                'Hura': { particle: 'BE', suffix: 'KI', zSuffix: '' },
                'Gu': { particle: '', suffix: '', zSuffix: 'ZKI' },
                'Zu': { particle: 'ZA', suffix: 'KI', zSuffix: 'ZKI' },
                'Zuek': { particle: 'ZA', suffix: 'KI', zSuffix: 'ZKI' },
                'Haiek': { particle: 'BE', suffix: 'KI', zSuffix: 'ZKI' }
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
            extraSuffixMappings: {
                'Ni': { teSuffix: '' },
                'Hi': { teSuffix: '' },
                'Hura': { teSuffix: '' },
                'Gu': { teSuffix: '' },
                'Zu': { teSuffix: '' },
                'Zuek': { teSuffix: 'TE' },
                'Haiek': { teSuffix: '' }
            },
            results: (nor, nori) => {
                const formas = aditzak.sistema["nor-nori"][nor][nori]["agintera"];
                return formas.join(' / ');
            }
        }
    }
}