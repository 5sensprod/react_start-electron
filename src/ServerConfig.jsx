import React, { useState, useEffect } from 'react'
import { ipcRendererHelper } from './components/utils/ipcRenderer' // Assurez-vous que le chemin d'importation est correct

const SettingsForm = () => {
  const [serverUrl, setServerUrl] = useState('')
  const [saveStatus, setSaveStatus] = useState('')

  useEffect(() => {
    const handleConfigSaved = (success) => {
      setSaveStatus(
        success
          ? 'Configuration saved successfully.'
          : 'Failed to save configuration.',
      )
    }

    ipcRendererHelper.on('config-saved', handleConfigSaved)

    return () => {
      ipcRendererHelper.removeAllListeners('config-saved')
    }
  }, [])

  useEffect(() => {
    const handleConfigUpdated = (newConfig) => {
      if (newConfig && newConfig.serverUrl) {
        // Mettre à jour l'état ou effectuer d'autres actions avec la nouvelle configuration
      }
    }

    ipcRendererHelper.on('config-updated', handleConfigUpdated)

    return () => {
      ipcRendererHelper.removeAllListeners('config-updated')
    }
  }, [])

  const isValidUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://')
  }

  const handleSave = () => {
    if (!isValidUrl(serverUrl)) {
      setSaveStatus('Please enter a valid URL.')
      return
    }

    console.log('Sending new config to main process:', { serverUrl })
    ipcRendererHelper.send('save-config', { serverUrl })
    setServerUrl('')
  }
  return (
    <div>
      <input
        type="text"
        value={serverUrl}
        onChange={(e) => setServerUrl(e.target.value)}
        placeholder="http://192.168.1.10:5000"
      />
      <button onClick={handleSave}>Save</button>
      {saveStatus && <div>{saveStatus}</div>}
    </div>
  )
}

export default SettingsForm
