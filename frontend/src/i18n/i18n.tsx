import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import strEs from '../../public/locales/es/str.json';
import strEn from '../../public/locales/en/str.json';
import strPt from '../../public/locales/pt/str.json';
import strCn from '../../public/locales/cn/str.json';

const resources = {
  es: {
      str: strEs,
  },
  en: {
    str: strEn,
  },
  pt: {
    str: strPt,
  },
  cn: {
    str: strCn,
  },
}

i18next
  .use(initReactI18next)
  .init({
      resources,
      lng: 'es',
      debug: false,
      fallbackLng: 'es',
      saveMissing: true
  });

export default i18next;