import { SimpleMatrix } from './SimpleMatrix'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <div id="matrix"></div>
  <button id="btnStart">Start</button>
  <button id="btnStop">Stop</button>
</div>
`

const matrix = new SimpleMatrix(document.querySelector<HTMLDivElement>('#matrix')!)


document.querySelector<HTMLButtonElement>('#btnStart')!.addEventListener('click', () => matrix.start())
document.querySelector<HTMLButtonElement>('#btnStop')!.addEventListener('click', () => matrix.stop())
