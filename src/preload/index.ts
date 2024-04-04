import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('wellifyAPI', {
      check: () => ipcRenderer.invoke('internal:check'),
      loki: () => ipcRenderer.invoke('internal:check'),
      checkAPI: (name) => ipcRenderer.invoke('internal:apiCheck', name),
      getWindow: () => ipcRenderer.invoke('get-window'),
      getEmotions: () => ipcRenderer.invoke('get-emotions')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
