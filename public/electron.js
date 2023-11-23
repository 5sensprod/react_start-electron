const { app } = require('electron')
const { createWindow } = require('../main/windowManager')
const { setupIpcHandlers } = require('../main/ipcHandlers')

let mainWindow

function startExpressServer() {
  const server = require('../server/server')
  const PORT = 5000
  server.listen(PORT, () => {
    console.log(`Express and WebSocket server listening on port ${PORT}`)
  })
}

app.on('ready', () => {
  console.log('App is ready, starting Express server...')
  startExpressServer()
  mainWindow = createWindow()
  setupIpcHandlers(mainWindow)
  console.log('Main window created')
})

app.on('window-all-closed', function () {
  console.log('All windows closed, quitting app')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  console.log('App activated')
  if (mainWindow === null) {
    console.log('Main window is null, creating new window')
    mainWindow = createWindow()
    setupIpcHandlers(mainWindow)
  } else {
    console.log('Main window already exists')
  }
})
