import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      urgent: 'Urgent',
      important: 'Important',
      medium: 'Medium',
      low: 'Low',
      
      // Actions
      addNote: 'Add Note',
      editNote: 'Edit Note',
      deleteNote: 'Delete Note',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      
      // Form Fields
      title: 'Title',
      description: 'Description',
      priority: 'Priority',
      color: 'Color',
      enterTitle: 'Enter note title',
      enterDescription: 'Enter note description',
      
      // Messages
      noNotes: 'No notes yet',
      createFirst: 'Create your first note',
      deleteConfirm: 'Are you sure you want to delete this note?',
      
      // Auth
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      
      // Priority Levels
      priorityUrgent: 'Urgent',
      priorityImportant: 'Important',
      priorityMedium: 'Medium',
      priorityLow: 'Low',
    }
  },
  fa: {
    translation: {
      // Navigation
      urgent: 'فوری',
      important: 'مهم',
      medium: 'متوسط',
      low: 'کم اهمیت',
      
      // Actions
      addNote: 'افزودن یادداشت',
      editNote: 'ویرایش یادداشت',
      deleteNote: 'حذف یادداشت',
      save: 'ذخیره',
      cancel: 'لغو',
      delete: 'حذف',
      edit: 'ویرایش',
      
      // Form Fields
      title: 'عنوان',
      description: 'توضیحات',
      priority: 'اولویت',
      color: 'رنگ',
      enterTitle: 'عنوان یادداشت را وارد کنید',
      enterDescription: 'توضیحات یادداشت را وارد کنید',
      
      // Messages
      noNotes: 'هنوز یادداشتی وجود ندارد',
      createFirst: 'اولین یادداشت خود را ایجاد کنید',
      deleteConfirm: 'آیا مطمئن هستید که می‌خواهید این یادداشت را حذف کنید؟',
      
      // Auth
      login: 'ورود',
      signup: 'ثبت نام',
      logout: 'خروج',
      email: 'ایمیل',
      password: 'رمز عبور',
      dontHaveAccount: 'حساب کاربری ندارید؟',
      alreadyHaveAccount: 'حساب کاربری دارید؟',
      
      // Priority Levels
      priorityUrgent: 'فوری',
      priorityImportant: 'مهم',
      priorityMedium: 'متوسط',
      priorityLow: 'کم اهمیت',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
