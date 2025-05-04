import React, { createContext, useContext, useState, useEffect } from 'react';

// Available languages
export type Language = 'en' | 'ar';

// Translations for each language
const translations = {
  en: {
    dashboard: 'Dashboard',
    projects: 'Projects',
    timeTracker: 'Time Tracker',
    clients: 'Clients',
    calendar: 'Calendar',
    messages: 'Messages',
    analytics: 'Analytics',
    goals: 'Goals',
    finances: 'Finances',
    files: 'Files',
    settings: 'Settings',
    aiAssistant: 'AI Assistant',
    welcomeBack: 'Welcome back',
    overview: "Here's an overview of your freelance business.",
    newProject: 'New Project',
    startTimer: 'Start Timer',
    createInvoice: 'Create Invoice',
    addClient: 'Add Client',
    monthlyEarnings: 'Monthly Earnings',
    activeProjects: 'Active Projects',
    hoursTracked: 'Hours Tracked',
    unreadMessages: 'unread',
    currentProjects: 'Current Projects',
    viewAll: 'View All',
    inProgress: 'In Progress',
    onTrack: 'On Track',
    delayed: 'Delayed',
    client: 'Client',
    due: 'Due',
    progress: 'Progress',
    recentTimeEntries: 'Recent Time Entries',
    today: 'Today',
    yesterday: 'Yesterday',
    edit: 'Edit',
    viewAllTimeEntries: 'View All Time Entries',
    recentMessages: 'Recent Messages',
    recentGoals: 'Goals',
    reply: 'Reply',
    markAsRead: 'Mark as Read',
    complete: 'Complete',
    completed: 'Completed',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    freePlan: 'Free Plan',
    upgrade: 'Upgrade',
    signOut: 'Sign Out',
    yourProfile: 'Your Profile',
    new: 'New',
    beta: 'Beta',
    chat: 'Chat',
    tools: 'Tools',
    help: 'Help',
    aiAssistantDescription: 'Get help and advice for your freelance work with our AI assistant.',
    suggestedQuestions: 'Suggested Questions',
    thinking: 'Thinking',
    typeYourMessage: 'Type your message...',
    poweredByOpenAI: 'Powered by OpenAI',
    projectAnalyzer: 'Project Analyzer',
    projectAnalyzerDescription: 'Analyze project descriptions and get insights on pricing and scope.',
    rateCalculator: 'Rate Calculator',
    rateCalculatorDescription: 'Calculate optimal rates for your freelance services.',
    timeEstimator: 'Time Estimator',
    timeEstimatorDescription: 'Estimate time needed for your projects based on requirements.',
    imageGenerator: 'Image Generator',
    imageGeneratorDescription: 'Generate images for your creative projects.',
    analyze: 'Analyze',
    calculate: 'Calculate',
    estimate: 'Estimate',
    generate: 'Generate',
    aiAssistantHelp: 'How to use the AI Assistant',
    aiAssistantHelpDescription: 'Learn how to get the most out of your AI assistant.',
    howToUseChat: 'How to use the chat',
    chatUsagePoint1: 'Ask questions about freelancing, pricing, client management, etc.',
    chatUsagePoint2: 'Get advice on specific freelance projects or situations.',
    chatUsagePoint3: 'Use suggested questions or type your own.',
    chatUsagePoint4: 'The more details you provide, the better the response.',
    whatCanAIAssistantDo: 'What can the AI Assistant do?',
    aiCapabilityPoint1: 'Provide freelance business advice and best practices.',
    aiCapabilityPoint2: 'Help with pricing strategies and rate calculations.',
    aiCapabilityPoint3: 'Suggest ways to deal with difficult clients or projects.',
    aiCapabilityPoint4: 'Guide you through time management and productivity techniques.',
    aiCapabilityPoint5: 'Analyze project requirements and provide insights.',
    // Add more translations as needed
  },
  ar: {
    dashboard: 'لوحة القيادة',
    projects: 'المشاريع',
    timeTracker: 'متتبع الوقت',
    clients: 'العملاء',
    calendar: 'التقويم',
    messages: 'الرسائل',
    analytics: 'التحليلات',
    goals: 'الأهداف',
    finances: 'الماليات',
    files: 'الملفات',
    settings: 'الإعدادات',
    aiAssistant: 'المساعد الذكي',
    welcomeBack: 'مرحبًا بعودتك',
    overview: 'إليك نظرة عامة على عملك المستقل.',
    newProject: 'مشروع جديد',
    startTimer: 'بدء المؤقت',
    createInvoice: 'إنشاء فاتورة',
    addClient: 'إضافة عميل',
    monthlyEarnings: 'الأرباح الشهرية',
    activeProjects: 'المشاريع النشطة',
    hoursTracked: 'الساعات المتتبعة',
    unreadMessages: 'غير مقروءة',
    currentProjects: 'المشاريع الحالية',
    viewAll: 'عرض الكل',
    inProgress: 'قيد التنفيذ',
    onTrack: 'في المسار الصحيح',
    delayed: 'متأخر',
    client: 'العميل',
    due: 'تاريخ الاستحقاق',
    progress: 'التقدم',
    recentTimeEntries: 'إدخالات الوقت الأخيرة',
    today: 'اليوم',
    yesterday: 'الأمس',
    edit: 'تعديل',
    viewAllTimeEntries: 'عرض جميع إدخالات الوقت',
    recentMessages: 'الرسائل الأخيرة',
    recentGoals: 'الأهداف',
    reply: 'الرد',
    markAsRead: 'وضع علامة كمقروء',
    complete: 'إكمال',
    completed: 'مكتمل',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    signUp: 'التسجيل',
    forgotPassword: 'نسيت كلمة المرور؟',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    fullName: 'الاسم الكامل',
    confirmPassword: 'تأكيد كلمة المرور',
    freePlan: 'الخطة المجانية',
    upgrade: 'ترقية',
    signOut: 'تسجيل الخروج',
    yourProfile: 'ملفك الشخصي',
    new: 'جديد',
    beta: 'تجريبي',
    chat: 'دردشة',
    tools: 'أدوات',
    help: 'مساعدة',
    aiAssistantDescription: 'احصل على المساعدة والنصائح لعملك المستقل مع مساعدنا الذكي.',
    suggestedQuestions: 'أسئلة مقترحة',
    thinking: 'جاري التفكير',
    typeYourMessage: 'اكتب رسالتك...',
    poweredByOpenAI: 'مدعوم بواسطة OpenAI',
    projectAnalyzer: 'محلل المشاريع',
    projectAnalyzerDescription: 'تحليل وصف المشروع والحصول على رؤى حول التسعير والنطاق.',
    rateCalculator: 'حاسبة الأسعار',
    rateCalculatorDescription: 'احسب الأسعار المثلى لخدماتك المستقلة.',
    timeEstimator: 'مقدر الوقت',
    timeEstimatorDescription: 'تقدير الوقت اللازم لمشاريعك بناءً على المتطلبات.',
    imageGenerator: 'مولد الصور',
    imageGeneratorDescription: 'إنشاء صور لمشاريعك الإبداعية.',
    analyze: 'تحليل',
    calculate: 'حساب',
    estimate: 'تقدير',
    generate: 'إنشاء',
    aiAssistantHelp: 'كيفية استخدام المساعد الذكي',
    aiAssistantHelpDescription: 'تعلم كيفية الاستفادة القصوى من المساعد الذكي.',
    howToUseChat: 'كيفية استخدام الدردشة',
    chatUsagePoint1: 'اطرح أسئلة حول العمل الحر، والتسعير، وإدارة العملاء، إلخ.',
    chatUsagePoint2: 'احصل على نصائح حول مشاريع أو مواقف العمل الحر المحددة.',
    chatUsagePoint3: 'استخدم الأسئلة المقترحة أو اكتب أسئلتك الخاصة.',
    chatUsagePoint4: 'كلما قدمت تفاصيل أكثر، كان الرد أفضل.',
    whatCanAIAssistantDo: 'ماذا يمكن أن يفعل المساعد الذكي؟',
    aiCapabilityPoint1: 'تقديم نصائح لأعمال العمل الحر وأفضل الممارسات.',
    aiCapabilityPoint2: 'المساعدة في استراتيجيات التسعير وحسابات الأسعار.',
    aiCapabilityPoint3: 'اقتراح طرق للتعامل مع العملاء أو المشاريع الصعبة.',
    aiCapabilityPoint4: 'إرشادك خلال تقنيات إدارة الوقت والإنتاجية.',
    aiCapabilityPoint5: 'تحليل متطلبات المشروع وتقديم رؤى بشأنها.',
    // Add more translations as needed
  },
};

// Define the context shape
type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Props for the I18nProvider component
type I18nProviderProps = {
  children: React.ReactNode;
  defaultLang?: Language;
};

export const I18nProvider = ({ children, defaultLang = 'en' }: I18nProviderProps) => {
  const [lang, setLang] = useState<Language>(() => {
    const savedLang = localStorage.getItem('creatorpro-lang');
    return (savedLang as Language) || defaultLang;
  });

  // Save language preference to localStorage
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('creatorpro-lang', lang);
    // Add RTL support for Arabic
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Translation function
  const t = (key: string): string => {
    const currentLang = translations[lang] || translations.en;
    return currentLang[key as keyof typeof currentLang] || key;
  };

  return React.createElement(I18nContext.Provider, 
    { value: { lang, setLang, t } }, 
    children
  );
};

// Hook to use the i18n context
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
