let ipcRenderer = null

export const ipcRendererHelper = {
  send: (channel, ...args) => {
    if (window.electron && window.electron.ipcRenderer) {
      window.electron.ipcRenderer.send(channel, ...args)
    } else {
      console.error('ipcRenderer is not available')
    }
  },
  on: (channel, func) => {
    if (ipcRenderer) {
      ipcRenderer.on(channel, (event, ...args) => func(event, ...args))
    }
  },
  once: (channel, func) => {
    if (ipcRenderer) {
      ipcRenderer.once(channel, (event, ...args) => func(event, ...args))
    }
  },
  removeAllListeners: (channel) => {
    if (ipcRenderer) {
      ipcRenderer.removeAllListeners(channel)
    }
  },

  init: () => {
    if (window.electron && window.electron.ipcRenderer) {
      ipcRenderer = window.electron.ipcRenderer
    }
  },
}
