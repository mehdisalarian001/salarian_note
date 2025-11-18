import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={toggleLanguage}
        variant="outline"
        className="relative overflow-hidden border-primary/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary transition-all duration-300"
      >
        <span className="relative z-10 font-bold text-primary glow-text">
          {i18n.language === 'en' ? 'FA' : 'EN'}
        </span>
        <motion.div
          className="absolute inset-0 bg-primary/10"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  );
};
