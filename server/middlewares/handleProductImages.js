const { sanitizeString } = require('../utils/stringUtils')
const path = require('path')
const {
  ensureDirectoryExists,
  copyFilesToDirectory,
  buildFilePath,
} = require('../utils/fileUtils')
const electron = require('electron')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const cataloguePath = path.join(userDataPath, 'catalogue')

module.exports = (req, res, next) => {
  const formattedReference = sanitizeString(req.body.reference)
  const photos = req.body.photos || []
  const destinationDir = path.join(cataloguePath, formattedReference)

  ensureDirectoryExists(destinationDir)

  try {
    copyFilesToDirectory(photos, destinationDir)

    req.body.photos = photos.map((photo) =>
      buildFilePath('catalogue', formattedReference, photo),
    )
    next()
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la copie des images',
      error: err.message,
    })
  }
}
