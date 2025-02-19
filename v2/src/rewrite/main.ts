import './styles.css'
import { createMatrix } from './Matrix'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <div>
    <button id="btnStart">Start</button>
    <button id="btnStop">Stop</button>
    <div id="stats" style="display: inline; margin-left: 4px;"></div>
  </div>
  <div id="matrix" style="margin-top: 8px; width: 1236px;"></div>
</div>
`

const matrix = createMatrix(
    document.querySelector<HTMLDivElement>('#matrix')!,
    5000,
    // 100,
    // 1,
    { maxFps: 60 }
)

const statsEl = document.querySelector<HTMLDivElement>("#stats")!
setInterval(() => {
  const stats = matrix.getStats()
  statsEl.innerHTML = `frame time: ${Math.ceil(stats.averageFrameTime)} / ${Math.ceil(stats.minFrameTime)} ms | fps: ${Math.ceil(stats.averageFps)} / ${Math.ceil(stats.maxFps)} | nodes: ${stats.symbolCount}`
}, 100)

document.querySelector<HTMLButtonElement>('#btnStart')!.addEventListener('click', () => matrix.start())
document.querySelector<HTMLButtonElement>('#btnStop')!.addEventListener('click', () => matrix.stop())
