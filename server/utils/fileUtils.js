const fs = require('fs')
const path = require('path')
const { sanitizeString } = require('./stringUtils')

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

const copyFilesToDirectory = (filePaths, destinationDir) => {
  filePaths.forEach((filePath) => {
    const filename = path.basename(filePath)
    const destPath = path.join(destinationDir, filename)
    fs.copyFileSync(filePath, destPath)
  })
}

const buildFilePath = (baseDir, reference, originalPath) => {
  const formattedReference = sanitizeString(reference)
  const filename = path.basename(originalPath)
  return path.posix.join(baseDir, formattedReference, filename)
}

module.exports = {
  ensureDirectoryExists,
  copyFilesToDirectory,
  buildFilePath,
}
