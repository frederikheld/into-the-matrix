import { SimpleMatrix } from './SimpleMatrix'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <div id="stats" style="display: inline;"></div>
  <div>
    <button id="btnStart">Start</button>
    <button id="btnStop">Stop</button>
  </div>
  <div id="matrix" style="margin-top: 8px; width: 2000px;"></div>
</div>
`

const matrix = new SimpleMatrix(
  document.querySelector<HTMLDivElement>('#matrix')!,
  5000,
  { maxFps: 30 }
)

const statsEl = document.querySelector<HTMLDivElement>("#stats")!
setInterval(() => {
  const stats = matrix.getStats()
  statsEl.innerHTML = `frame time: ${Math.ceil(stats.frameTime)} / ${Math.ceil(stats.minFrameTime)} ms | fps: ${Math.ceil(stats.fps)} / ${Math.ceil(stats.maxFps)} | nodes: ${stats.symbolCount}`
}, 100)

document.querySelector<HTMLButtonElement>('#btnStart')!.addEventListener('click', () => matrix.start())
document.querySelector<HTMLButtonElement>('#btnStop')!.addEventListener('click', () => matrix.stop())
