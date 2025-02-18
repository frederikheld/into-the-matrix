import './styles.css'
import { SimpleMatrix } from './SimpleMatrix'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <button id="btnStart">Start</button>
  <button id="btnStop">Stop</button>
  <div id="stats" style="display: inline;"></div>
  <div id="matrix" style="margin-top: 8px; width: 400px;"></div>
</div>
`

const matrix = new SimpleMatrix(
  document.querySelector<HTMLDivElement>('#matrix')!, 1000,
  { maxFps: 60 }
)

const statsEl = document.querySelector<HTMLDivElement>("#stats")!
setInterval(() => {
  const stats = matrix.getStats()
  statsEl.innerHTML = `frame time: ${Math.ceil(stats.frameTime)} / ${Math.ceil(stats.minFrameTime)} ms | fps: ${Math.ceil(stats.fps)} / ${Math.ceil(stats.maxFps)}`
}, 100)

document.querySelector<HTMLButtonElement>('#btnStart')!.addEventListener('click', () => matrix.start())
document.querySelector<HTMLButtonElement>('#btnStop')!.addEventListener('click', () => matrix.stop())
