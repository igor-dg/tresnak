
function seleccionarSujeto(sistema) {
  const sujetos = {
    'nor': ['NI', 'HI', 'HURA', 'GU', 'ZU', 'ZUEK', 'HAIEK'],
    'nor-nork': ['NIK', 'HIK', 'HARK', 'GUK', 'ZUK', 'ZUEK', 'HAIEK'],
    'nor-nori': ['NI', 'HI', 'HURA', 'GU', 'ZU', 'ZUEK', 'HAIEK'],
    'nor-nori-nork': ['NIK', 'HIK', 'HARK', 'GUK', 'ZUK', 'ZUEK', 'HAIEK']
  }
  return sujetos[sistema][Math.floor(Math.random() * sujetos[sistema].length)]
}

function seleccionarObjeto(sistema, sujeto) {
  const objetos = {
    'nor-nork': ['NI', 'HI', 'HURA', 'GU', 'ZU', 'ZUEK', 'HAIEK'],
    'nor-nori': ['NIRI', 'HIRI', 'HARI', 'GURI', 'ZURI', 'ZUEI', 'HAIEI'],
    'nor-nori-nork': ['NIRI', 'HIRI', 'HARI', 'GURI', 'ZURI', 'ZUEI', 'HAIEI']
  }
  
  // Evitar combinaciones inválidas (por ejemplo, NIK-NIRI)
  let objetosValidos = objetos[sistema].filter(obj => 
    !((sujeto === 'NIK' && obj === 'NIRI') ||
      (sujeto === 'ZUK' && obj === 'ZURI') ||
      (sujeto === 'ZU' && obj === 'ZURI') ||
      (sujeto === 'GUK' && obj === 'GURI'))
  )
  
  return objetosValidos[Math.floor(Math.random() * objetosValidos.length)]
}

function aplicarReglasFrase(phrase, time) {
  if (time === 'orain' || time === 'lehen') {
    return phrase.replace(/\(ko\)/g, '').replace(/\(go\)/g, '')
                 .replace(/\(tu\)/g, 'tu').replace(/\(du\)/g, 'du')
                 .replace(/\(i\)/g, 'i').replace(/\(u\)/g, 'u')
                 .replace(/\(ri\)/g, 'ri');
  }
  if (time === 'bal_hip' || time === 'ond_or' || time === 'ond_leh') {
    return phrase.replace(/\(ko\)/g, 'ko').replace(/\(go\)/g, 'go')
                 .replace(/\(tu\)/g, 'tu').replace(/\(du\)/g, 'du')
                 .replace(/\(i\)/g, 'i').replace(/\(u\)/g, 'u')
                 .replace(/\(ri\)/g, 'ri');
  }
  if (time === 'agintera' || time === 'ahal_or' || time === 'ahal_leh' || 
      time === 'ahal_hip' || time === 'subj_or' || time === 'subj_leh') {
    return phrase.replace(/\(ko\)/g, '').replace(/\(go\)/g, '')
                 .replace(/\(tu\)/g, '').replace(/\(du\)/g, '')
                 .replace(/\(i\)/g, '').replace(/\(ri\)/g, '')
                 .replace(/\(u\)/g, '');
  }
  return phrase;
}

function obtenerConjugacionSujeto(subject) {
  // Mapeo de sujetos gramaticales
  const mapeoSujetos = {
    'ni': 'NI',
    'hi': 'HI', 
    'hura': 'HURA',
    'gu': 'GU',
    'zu': 'ZU',
    'zuek': 'ZUEK',
    'haiek': 'HAIEK',
    'nik': 'NIK',
    'hik': 'HIK',
    'hark': 'HARK',
    'guk': 'GUK',
    'zuk': 'ZUK'
  }
  return mapeoSujetos[subject.toLowerCase()] || subject
}

function obtenerConjugacionObjeto(object) {
  const mapeoObjetos = {
    'niri': 'NIRI',
    'hiri': 'HIRI',
    'hari': 'HARI',
    'guri': 'GURI',
    'zuri': 'ZURI',
    'zuei': 'ZUEI',
    'haiei': 'HAIEI',
    'ni': 'NI',
    'hi': 'HI',
    'hura': 'HURA', 
    'gu': 'GU',
    'zu': 'ZU',
    'zuek': 'ZUEK',
    'haiek': 'HAIEK'
  }
  return mapeoObjetos[object.toLowerCase()] || object
}

function obtenerConjugacion(grupo, tiempo, sujeto, objeto, numero = 'Sing') {
  if (grupo.sistema === 'nor-nori-nork') {
    return grupo[numero][sujeto]?.[objeto]?.[tiempo]?.[0] || ''
  } else if (grupo.sistema === 'nor-nori') {
    return grupo[objeto]?.[tiempo]?.[0] || ''
  } else if (grupo.sistema === 'nor-nork') {
    return grupo[objeto]?.[sujeto]?.[tiempo]?.[0] || ''
  } else {
    return grupo[sujeto]?.[tiempo]?.[0] || ''
  }
}

export {
  seleccionarSujeto,
  seleccionarObjeto,
  aplicarReglasFrase,
  obtenerConjugacionSujeto,
  obtenerConjugacionObjeto,
  obtenerConjugacion
}