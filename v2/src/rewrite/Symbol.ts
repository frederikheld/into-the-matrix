export interface Symbol {
  el: HTMLDivElement;
  render: Function;
}

const allChars: string[] = [
  "ﾊ",
  "ﾐ",
  "ﾋ",
  "ｰ",
  "ｳ",
  "ｼ",
  "ﾅ",
  "ﾓ",
  "ﾆ",
  "ｻ",
  "ﾜ",
  "ﾂ",
  "ｵ",
  "ﾘ",
  "ｱ",
  "ﾎ",
  "ﾃ",
  "ﾏ",
  "ｹ",
  "ﾒ",
  "ｴ",
  "ｶ",
  "ｷ",
  "ﾑ",
  "ﾕ",
  "ﾗ",
  "ｾ",
  "ﾈ",
  "ｽ",
  "ﾀ",
  "ﾇ",
  "ﾍ",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

export const createSymbol = (
  parentEl: HTMLDivElement,
  index: number
): Symbol => {
  // const chars = getRandomSubset(allChars, 5)
  // const el = setup(rotation, chars)

  const el = document.createElement("div");

  setup(index);

  parentEl.appendChild(el);

  /* private */
  function setup(index: number): void {
    el.id = `symbol-${index}`;
    el.classList.add("symbol");

    el.innerText = getRandomChar(allChars);

    render();
  }

  /* public */
  function render() {
    /* straightforward innerText approach */
    // el.innerText = getRandomChar(allChars);

    if (index === 48) {
      el.innerText = getRandomChar(allChars);
    }

    /* ::before data-content approach */
    // el.setAttribute('data-content', getRandomChar(allChars))

    /* ::before sprite approach */
    // el.style.setProperty('--bg-transform', `-${Math.floor(Math.random() * allChars.length) * 16}px`)
  }

  return {
    el,
    render,
  };
};

function getRandomChar(chars: string[]): string {
  const index = Math.floor(Math.random() * chars.length);
  return chars[index];
}

/**
 * Returns an array that contains uniquely different entries
 * from `array`. If `length` is less than `array.length`, the
 * return array will have that length. Otherwise it will have
 * `array.length`.
 *
 * This function assumes that all entries in `array` are
 * different.
 *
 * NOTE: the closer the length gets to the array length, the
 * more inefficient this function gets! Use with caution!
 *
 * @param array
 * @param length
 * @returns
 */
function getRandomSubset(array: any, length: number): any[] {
  const chars = new Set<any>();

  const maxLength = array.length < length ? array.length : length;

  while (chars.size < maxLength) {
    const index = Math.floor(Math.random() * array.length);
    chars.add(array[index]);
  }

  return [...chars];
}
