// main/configManager.js

let currentConfig = {}

const getConfig = () => currentConfig

const setConfig = (newConfig) => {
  currentConfig = newConfig
}

module.exports = { getConfig, setConfig }
