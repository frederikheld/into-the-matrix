import './css/main.css'
import { Matrix } from './Matrix'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <div id="matrix-container"></div>
  <div id="ui-container">
    <div id="stats" class="stats"></div>
    <button id="btnRender">render</button>
    <button id="btnStart">Start</button>
    <button id="btnStop">Stop</button>
  </div>
</div>
`

const matrix = new Matrix(document.querySelector('#matrix-container')!, {
  maxFps: 10,
  newTrickleProbability: 0.1,
  changeSymbolProbability: 0.05,
  symbolSize: 24,
  fadeOutDuration: 3
})

const statsEl = document.querySelector<HTMLDivElement>('#stats')!
setInterval(() => {
  const stats = matrix.getStats()
  statsEl.innerHTML = `frame time: ${Math.ceil(stats.averageFrameTime)} / ${Math.ceil(stats.minFrameTime)} ms | fps: ${Math.ceil(stats.averageFps)} / ${Math.ceil(stats.maxFps)} | trickles: ${stats.trickleCount}`
}, 100)

/**
 * Will executed on init, so no extra `matrix.render()`
 * necessary.
 */
window.addEventListener('resize', () => matrix.resize())

document
  .querySelector<HTMLButtonElement>('#btnRender')!
  .addEventListener('click', () => matrix.render())

document
  .querySelector<HTMLButtonElement>('#btnStart')!
  .addEventListener('click', () => matrix.start())
document
  .querySelector<HTMLButtonElement>('#btnStop')!
  .addEventListener('click', () => matrix.stop())
