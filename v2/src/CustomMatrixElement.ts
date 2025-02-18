import { CustomSymbolElement } from "./CustomSymbolElement"

export class CustomMatrixElement extends HTMLDivElement {

  constructor(symbolsLength: number) {
    super()

    this.setup(symbolsLength)
  }

  private setup (symbolsLength: number) {
    new Array(symbolsLength).fill(0).forEach((_, i) => {
      const symbolEl = CustomSymbolElement.getElement()
      this.appendChild(new CustomSymbolElement(i))
    })
  }

  public start() {
    console.log('START')
  }

  public stop() {
    console.log('STOP')
  }

  /**
   * Returns a `CustomMatrixElement` that you can then
   * attach to your DOM. As it is an instance of
   * `CustomMatrixElement`, you can call the class members
   * on it as well.
   * 
   * Usage:
   * 
   *    // create matrix instance:
   *    const matrix = CustomMatrixElement.getElement()
   * 
   *    // attach it to DOM:
   *    const matrixEl = document.querySelector<HTMLDivElement>("#matrix")!
   *    matrixEl.appendChild(matrix)
   * 
   *    // interact with matrix instance:
   *    matrix.start()
   * 
   */
  static getElement() {
    return document.createElement('div', { is: 'custom-matrix' }) as CustomMatrixElement
  }
}

customElements.define("custom-matrix", CustomMatrixElement, { extends: 'div'})