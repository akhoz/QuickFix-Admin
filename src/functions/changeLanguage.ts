import i18n from '../../i18n';

function changeLanguage() {
    const newLanguage = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLanguage);
  };

export default changeLanguage;