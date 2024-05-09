import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../App';

const languageOptions = [
  { value: 'es', flag: 'https://hatscripts.github.io/circle-flags/flags/es.svg' },
  { value: 'en', flag: 'https://hatscripts.github.io/circle-flags/flags/uk.svg' },
  { value: 'pt', flag: 'https://hatscripts.github.io/circle-flags/flags/pt.svg' },
  { value: 'cn', flag: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' }
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

  const handleLanguageSelect = (value: any) => {
    setSelectedLanguage(value);
    setIsOpen(false);
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  const selectedLanguageOption = languageOptions.find((option) => option.value === selectedLanguage);
  

  return (
    <div className='p-1 pb-0 mb-0 relative'>
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedLanguageOption && (
          <img src={selectedLanguageOption.flag} alt="Flag" width={30} />
        )}
      </button>
      {isOpen && (
        <div className='p-2 border-solid border-2 pb-0 rounded-full absolute bg-white z-50'>
          {languageOptions.map((option) => (
            <button key={option.value} onClick={() => handleLanguageSelect(option.value)}>
              <img src={option.flag} alt="Flag" width={30} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default LanguageSelector;