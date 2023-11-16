const { setupAppLifecycle } = require('./main/appLifecycle')
const { setupIPCHandlers } = require('./main/ipcHandlers')

setupAppLifecycle()
setupIPCHandlers()
