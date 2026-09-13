import DefaultTheme from 'vitepress/theme'
import './custom.css'

let viewer: HTMLDivElement | null = null
let content: HTMLDivElement | null = null
let scale = 1
let offsetX = 0
let offsetY = 0
let dragging = false
let startX = 0
let startY = 0
let startOffsetX = 0
let startOffsetY = 0
let touchDistance = 0
let touchScale = 1

function applyTransform() {
  if (!content) return
  content.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
}

function resetView() {
  scale = 1
  offsetX = 0
  offsetY = 0
  applyTransform()
}

function closeViewer() {
  if (!viewer) return
  viewer.remove()
  viewer = null
  content = null
  document.body.classList.remove('diagram-viewer-open')
  document.removeEventListener('keydown', handleEscape)
}

function zoomAt(factor: number, clientX?: number, clientY?: number) {
  const next = Math.min(5, Math.max(0.5, scale * factor))
  if (!viewer || !content || next === scale) return

  if (clientX !== undefined && clientY !== undefined) {
    const rect = viewer.getBoundingClientRect()
    const x = clientX - rect.left - rect.width / 2
    const y = clientY - rect.top - rect.height / 2
    const ratio = next / scale
    offsetX = x - ratio * (x - offsetX)
    offsetY = y - ratio * (y - offsetY)
  }

  scale = next
  applyTransform()
}

function openViewer(svg: SVGElement) {
  closeViewer()

  viewer = document.createElement('div')
  viewer.className = 'diagram-viewer'
  viewer.setAttribute('role', 'dialog')
  viewer.setAttribute('aria-modal', 'true')
  viewer.setAttribute('aria-label', 'Expanded architecture diagram')

  const toolbar = document.createElement('div')
  toolbar.className = 'diagram-viewer-toolbar'

  const label = document.createElement('span')
  label.textContent = 'Diagram viewer'
  label.className = 'diagram-viewer-label'

  const controls = document.createElement('div')
  controls.className = 'diagram-viewer-controls'

  const button = (text: string, labelText: string, action: () => void) => {
    const el = document.createElement('button')
    el.type = 'button'
    el.textContent = text
    el.title = labelText
    el.setAttribute('aria-label', labelText)
    el.addEventListener('click', action)
    return el
  }

  controls.append(
    button('−', 'Zoom out', () => zoomAt(0.8)),
    button('100%', 'Reset zoom', resetView),
    button('+', 'Zoom in', () => zoomAt(1.25)),
    button('×', 'Close diagram', closeViewer)
  )

  toolbar.append(label, controls)

  const stage = document.createElement('div')
  stage.className = 'diagram-viewer-stage'

  content = document.createElement('div')
  content.className = 'diagram-viewer-content mermaid'

  // Keep the Mermaid wrapper class so VitePress/Mermaid CSS continues to
  // style node labels, edges, markers, and other generated SVG elements.
  content.appendChild(svg.cloneNode(true))
  stage.appendChild(content)
  viewer.append(toolbar, stage)
  document.body.appendChild(viewer)
  document.body.classList.add('diagram-viewer-open')
  resetView()

  stage.addEventListener('wheel', (event) => {
    event.preventDefault()
    zoomAt(event.deltaY < 0 ? 1.12 : 0.89, event.clientX, event.clientY)
  }, { passive: false })

  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragging = true
    startX = event.clientX
    startY = event.clientY
    startOffsetX = offsetX
    startOffsetY = offsetY
    stage.setPointerCapture(event.pointerId)
  })

  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return
    offsetX = startOffsetX + event.clientX - startX
    offsetY = startOffsetY + event.clientY - startY
    applyTransform()
  })

  stage.addEventListener('pointerup', () => { dragging = false })
  stage.addEventListener('pointercancel', () => { dragging = false })

  stage.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
      touchDistance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      )
      touchScale = scale
    }
  }, { passive: true })

  stage.addEventListener('touchmove', (event) => {
    if (event.touches.length !== 2 || touchDistance === 0) return
    event.preventDefault()
    const distance = Math.hypot(
      event.touches[0].clientX - event.touches[1].clientX,
      event.touches[0].clientY - event.touches[1].clientY
    )
    scale = Math.min(5, Math.max(0.5, touchScale * (distance / touchDistance)))
    applyTransform()
  }, { passive: false })

  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) closeViewer()
  })

  document.addEventListener('keydown', handleEscape)
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') closeViewer()
}

function installDiagramViewer() {
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null
    const svg = target?.closest('.mermaid svg') as SVGElement | null
    if (!svg) return
    event.preventDefault()
    openViewer(svg)
  })
}

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      window.setTimeout(installDiagramViewer, 0)
    }
  }
}
