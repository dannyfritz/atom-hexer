/** @babel */

const ansi_dict = {
  128: '€',
  130: '‚',
  131: 'ƒ',
  132: '„',
  133: '…',
  134: '†',
  135: '‡',
  136: 'ˆ',
  137: '‰',
  138: 'Š',
  139: '‹',
  140: 'Œ',
  145: '‘',
  146: '’',
  147: '“',
  148: '”',
  149: '•',
  150: '–',
  151: '—',
  152: '˜',
  153: '™',
  154: 'š',
  155: '›',
  156: 'œ',
  158: 'ž',
  159: 'Ÿ',
}

export function hex_to_ansi(hs) {
  const value = parseInt(hs[0] + hs[1], 16)
  if (
    value >= 0 && value < 32
    || value === 127
    || value === 129
    || value === 141
    || value === 143
    || value === 144
    || value === 157
  ) {
    return '·'
  }
  if (ansi_dict.hasOwnProperty(value)) {
    return ansi_dict[value]
  }
  return String.fromCharCode(value)
}
