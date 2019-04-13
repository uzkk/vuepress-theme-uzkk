const webfont = require('webfont').default
const { resolve } = require('path')
const { existsSync, mkdirSync, writeFile, readFileSync } = require('fs-extra')

const template = readFileSync(resolve(__dirname, 'template.css'), 'utf8')
const FONTS_DIR = resolve(__dirname, '../lib/fonts')
if (!existsSync(FONTS_DIR)) mkdirSync(FONTS_DIR)

webfont({
  files: 'icons/*.svg',
}).then(async (data) => {
  await Promise.all(['svg', 'eot', 'ttf', 'woff'].map((key) => {
    return writeFile(`${FONTS_DIR}/icons.${key}`, data[key])
  }))
  await writeFile(
    `${FONTS_DIR}/index.css`,
    template + data.glyphsData.map(({ metadata }) => {
      if (!metadata.name) return ''
      return `.icon-${metadata.name}:before { content: "\\${
        metadata.unicode[0].charCodeAt(0).toString(16).padStart(4, '0')
      }" }\n`
    }).join('')
  )
}).catch((error) => {
  console.error(error)
  process.exit(1)
})
