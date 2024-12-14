import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

import { createRendererStore } from '../../store.renderer'
import { useEffect } from 'react'

console.log('bridge', window.zustandBridge)
const store = createRendererStore(window.zustandBridge)
console.log('store', store)
function App(): JSX.Element {
  const state = store((state) => state)
  const mainSetState = (): void => {
    window.electron.ipcRenderer.send('ping')
  }

  const rendererSetState = () => {
    store.getState().setValue(`from client ${Math.random()}`)
  }

  useEffect(() => {
    const unsub = store.subscribe((state) => {
      console.log('store.subscribe', state)
    })
    return () => unsub()
  }, [])

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={rendererSetState}>
            Renderer {`->`} Main
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={mainSetState}>
            Main {`->`} Renderer
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
