export interface Symbol {
  el: HTMLDivElement
  render: () => void
}

const allChars: string[] = [
  'ﾊ',
  'ﾐ',
  'ﾋ',
  'ｰ',
  'ｳ',
  'ｼ',
  'ﾅ',
  'ﾓ',
  'ﾆ',
  'ｻ',
  'ﾜ',
  'ﾂ',
  'ｵ',
  'ﾘ',
  'ｱ',
  'ﾎ',
  'ﾃ',
  'ﾏ',
  'ｹ',
  'ﾒ',
  'ｴ',
  'ｶ',
  'ｷ',
  'ﾑ',
  'ﾕ',
  'ﾗ',
  'ｾ',
  'ﾈ',
  'ｽ',
  'ﾀ',
  'ﾇ',
  'ﾍ',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
]

/**
 * Scaffolding of the Symbol object and its html representation.
 *
 * Will only be called once when the object is being created, so
 * put all the heavy lifting here!
 *
 * @param parentEl
 * @param index
 * @returns
 */
export const createSymbol = (parentEl: HTMLDivElement, index: number): Symbol => {
  const el = document.createElement('div')

  setup(index)

  parentEl.appendChild(el)

  /* private */
  function setup(index: number): void {
    el.id = `symbol-${index}`
    el.classList.add('symbol')

    render()
  }

  /* public */
  function render() {
    el.innerText = getRandomChar(allChars)
  }

  return {
    el,
    render,
  }
}

function getRandomChar(chars: string[]): string {
  const index = Math.floor(Math.random() * chars.length)
  return chars[index]
}
