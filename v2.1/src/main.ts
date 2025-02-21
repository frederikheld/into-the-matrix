import './css/main.css'
import { createMatrix } from './Matrix'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <div id="matrix-container"></div>
  <div id="ui-container">
    <div id="stats" class="stats"></div>
    <button id="btnStart">Start</button>
    <button id="btnStop">Stop</button>
  </div>
</div>
`

const matrix = createMatrix(document.querySelector<HTMLDivElement>('#matrix-container')!, {
  // maxFps: 60,
  maxFps: 10,
  // maxFps: 20,
  newTrickleProbability: 0.1,
  changeSymbolProbability: 0.05,
  symbolSize: 24,
  fadeOutDuration: 3
})

matrix.render(0)
matrix.start()

const statsEl = document.querySelector<HTMLDivElement>('#stats')!
setInterval(() => {
  const stats = matrix.getStats()
  statsEl.innerHTML = `frame time: ${Math.ceil(stats.averageFrameTime)} / ${Math.ceil(stats.minFrameTime)} ms | fps: ${Math.ceil(stats.averageFps)} / ${Math.ceil(stats.maxFps)} | trickles: ${stats.trickleCount}`
}, 100)

document.addEventListener('resize', matrix.resize)

document.querySelector<HTMLButtonElement>('#btnStart')!.addEventListener('click', matrix.start)
document.querySelector<HTMLButtonElement>('#btnStop')!.addEventListener('click', matrix.stop)
