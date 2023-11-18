import i18n from 'i18next'
import HttpBackend from 'i18next-http-backend' // import HttpBackend
import { initReactI18next } from 'react-i18next'

i18n
  .use(HttpBackend) // utilisez HttpBackend
  .use(initReactI18next)
  .init({
    lng: 'fr',
    fallbackLng: 'en',
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json', // assurez-vous que c'est accessible via HTTP en mode développement
    },
    // autres options de configuration...
  })

export default i18n
