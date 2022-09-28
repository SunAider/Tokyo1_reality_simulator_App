import { useTranslation } from 'react-i18next';
// @mui
import { enUS, jaJP } from '@mui/material/locale';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: '日本語',
    value: 'ja',
    systemValue: jaJP,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_ja.svg',
  },
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[0];

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
