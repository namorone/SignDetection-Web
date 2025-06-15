"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Створюємо контекст для мови
export const LanguageContext = createContext()

// Переклади для української та англійської мов
export const translations = {
  uk: {
    // Загальні
    appName: "Перекладач української жестової мови",
    home: "Головна",
    about: "Про нас",
    contact: "Контакти",
    signIn: "Увійти",
    signUp: "Зареєструватися",
    dashboard: "Панель керування",
    translator: "Перекладач",
    training: "Тренування",
    progress: "Прогрес",
    settings: "Налаштування",
    logout: "Вийти",

    // Головна сторінка
    heroTitle: "Перекладач української жестової мови",
    heroSubtitle:
      "Руйнуємо комунікаційні бар'єри між жестовою мовою та мовленням. Наша платформа забезпечує безперешкодний переклад між українською жестовою мовою та текстом.",
    getStarted: "Почати",
    tryNow: "Спробувати зараз",
    interactiveDemo: "Інтерактивна демонстрація",
    experienceRealTime: "Спробуйте переклад жестової мови в реальному часі",

    // Функції
    keyFeatures: "Основні функції",
    keyFeaturesSubtitle:
      "Наша платформа пропонує комплексний набір інструментів для подолання комунікаційного розриву між жестовою та розмовною мовами.",
    signLanguageRecognition: "Розпізнавання жестової мови",
    signLanguageRecognitionDesc:
      "Розпізнавання української жестової мови в реальному часі за допомогою передового комп'ютерного зору.",
    signLanguageRecognitionText:
      "Наша нейронна мережа може точно розпізнавати та перекладати жести української жестової мови в текст.",
    speechToText: "Мовлення в текст",
    speechToTextDesc: "Перетворення розмовної української мови на текст для безперешкодного спілкування.",
    speechToTextText: "Наша система розпізнавання аудіо точно транскрибує розмовну українську мову в реальному часі.",
    interactiveLearning: "Інтерактивне навчання",
    interactiveLearningDesc: "Вивчайте жестову мову за допомогою наших інтерактивних навчальних модулів.",
    interactiveLearningText:
      "Практикуйте та вдосконалюйте свої навички жестової мови за допомогою нашої системи навчання, яка надає зворотній зв'язок у реальному часі.",
    progressTracking: "Відстеження прогресу",
    progressTrackingDesc: "Відстежуйте свій шлях навчання за допомогою детальної аналітики прогресу.",
    progressTrackingText:
      "Відстежуйте своє вдосконалення з часом за допомогою комплексної статистики та персоналізованих рекомендацій.",

    // Авторизація
    loginTitle: "Вхід",
    loginSubtitle: "Оберіть бажаний спосіб входу",
    signInWithGoogle: "Увійти через Google",
    orContinueWith: "Або продовжити з",
    email: "Електронна пошта",
    password: "Пароль",
    forgotPassword: "Забули пароль?",
    dontHaveAccount: "Немає облікового запису?",

    registerTitle: "Створити обліковий запис",
    registerSubtitle: "Введіть свою інформацію для створення облікового запису",
    signUpWithGoogle: "Зареєструватися через Google",
    name: "Ім'я",
    confirmPassword: "Підтвердіть пароль",
    createAccount: "Створити обліковий запис",
    alreadyHaveAccount: "Вже маєте обліковий запис?",

    // Панель керування
    welcomeBack: "Ласкаво просимо, ",
    openTranslator: "Відкрити перекладач",
    startTraining: "Почати тренування",
    viewProgress: "Переглянути прогрес",

    // Перекладач
    translatorTitle: "Перекладач",
    translatorSubtitle: "Переклад між жестовою мовою та голосовим вводом",
    signToText: "Жестова мова в текст",
    textToSign: "Мовлення в текст",
    recognitionSpeed: "Швидкість розпізнавання",
    startRecognition: "Почати розпізнавання",
    stopRecognition: "Зупинити розпізнавання",
    clear: "Очистити",
    copyText: "Копіювати текст",
    recognizedTextPlaceholder: "Розпізнаний текст з'явиться тут...",
    startListening: "Почати прослуховування",
    stopListening: "Зупинити прослуховування",
    spokenTextPlaceholder: "Розмовний текст з'явиться тут...",
    listeningActive: "Прослуховування...",
    microphoneInactive: "Мікрофон неактивний",

    // Тренування
    trainingTitle: "Тренування жестової мови",
    trainingSubtitle: "Практикуйте та вивчайте українську жестову мову",
    trainingProgress: "Прогрес тренування",
    trackProgress: "Відстежуйте свій прогрес у вивченні українського алфавіту",
    complete: "завершено",
    currentLetter: "Поточна літера: ",
    learnToSign: "Навчіться показувати цю літеру",
    previous: "Попередня",
    next: "Наступна",
    practiceSign: "Практика жесту",
    showSignToCamera: "Покажіть свій жест камері для перевірки",
    pressStartToBegin: "Натисніть Почати, щоб розпочати",
    correct: "Правильно!",
    greatJob: "Чудова робота! Ви правильно показали ",
    tryAgain: "Спробуйте ще раз",
    signNotRecognized: "Ваш жест для літери не був розпізнаний.",
    startPractice: "Почати практику",
    stop: "Зупинити",
    showSignForLetter: "Покажіть жест для літери ",
    analyzingSign: "Аналізуємо ваш жест...",

    // Прогрес
    progressTitle: "Ваш прогрес",
    progressSubtitle: "Відстежуйте свій прогрес у вивченні жестової мови",
    overallProgress: "Загальний прогрес",
    alphabetMastery: "Володіння алфавітом",
    masteredLetters: "Вивчені літери",
    lettersInProgress: "Літери в процесі",
    lettersToPractice: "Літери для практики",
    recentActivity: "Нещодавня активність",
    practiceSession: "Сеанс практики",
    accuracyRate: "Рівень точності",
    lettersPracticed: "Літери, які практикували",
    viewDetails: "Переглянути деталі",
    statisticsTitle: "Статистика",
    practiceTime: "Час практики",
    totalSessions: "Всього сеансів",
    averageAccuracy: "Середня точність",
    mostPracticedLetters: "Найбільш практиковані літери",
    recommendationsTitle: "Рекомендації",
    recommendationsText: "На основі вашого прогресу, ми рекомендуємо зосередитися на наступних літерах:",
    continueTraining: "Продовжити тренування",

    // Про нас
    aboutTitle: "Про нас",
    aboutSubtitle: "Дізнайтеся більше про нашу місію та команду",
    ourMission: "Наша місія",
    ourMissionText:
      "Наша місія полягає в тому, щоб зробити спілкування доступним для всіх, незалежно від їхніх можливостей. Ми прагнемо подолати комунікаційний розрив між спільнотами глухих та тих, хто чує, за допомогою інноваційних технологічних рішень.",
    ourStory: "Наша історія",
    ourStoryText:
      "Проект перекладача української жестової мови розпочався як університетський проект, спрямований на вирішення реальних проблем, з якими стикаються люди з вадами слуху в Україні. З часом він перетворився на повноцінну платформу, яка використовує передові технології штучного інтелекту для забезпечення точного та надійного перекладу жестової мови.",
    ourTechnology: "Наша технологія",
    ourTechnologyText:
      "Ми використовуємо найсучасніші технології комп'ютерного зору та машинного навчання для розпізнавання та інтерпретації жестів української жестової мови. Наша система постійно навчається та вдосконалюється, забезпечуючи все більш точні результати з часом.",
    meetTheTeam: "Познайомтеся з командою",
    teamMember1: "Олександр Петренко",
    teamMember1Role: "Засновник і керівник проекту",
    teamMember2: "Марія Коваленко",
    teamMember2Role: "Провідний розробник ШІ",
    teamMember3: "Іван Шевченко",
    teamMember3Role: "Фронтенд-розробник",
    teamMember4: "Наталія Мельник",
    teamMember4Role: "Експерт з жестової мови",

    // Контакти
    contactTitle: "Зв'яжіться з нами",
    contactSubtitle: "Маєте запитання чи пропозиції? Ми хотіли б почути від вас!",
    contactFormTitle: "Надішліть нам повідомлення",
    yourName: "Ваше ім'я",
    yourEmail: "Ваша електронна пошта",
    subject: "Тема",
    message: "Повідомлення",
    send: "Надіслати",
    contactInfo: "Контактна інформація",
    address: "Адреса",
    addressText: "вул. Хрещатик 1, Київ, Україна",
    phoneNumber: "Номер телефону",
    emailAddress: "Електронна пошта",
    followUs: "Слідкуйте за нами",

    // Налаштування мови
    language: "Мова",
    ukrainian: "Українська",
    english: "Англійська",
  },
  en: {
    // General
    appName: "Ukrainian Sign Language Translator",
    home: "Home",
    about: "About",
    contact: "Contact",
    signIn: "Sign In",
    signUp: "Sign Up",
    dashboard: "Dashboard",
    translator: "Translator",
    training: "Training",
    progress: "Progress",
    settings: "Settings",
    logout: "Log out",

    // Home page
    heroTitle: "Ukrainian Sign Language Translator",
    heroSubtitle:
      "Breaking communication barriers between sign language and speech. Our platform enables seamless translation between Ukrainian sign language and text.",
    getStarted: "Get Started",
    tryNow: "Try Now",
    interactiveDemo: "Interactive Demo",
    experienceRealTime: "Experience real-time sign language translation",

    // Features
    keyFeatures: "Key Features",
    keyFeaturesSubtitle:
      "Our platform offers a comprehensive set of tools to help bridge the communication gap between sign language and spoken language.",
    signLanguageRecognition: "Sign Language Recognition",
    signLanguageRecognitionDesc: "Real-time recognition of Ukrainian sign language using advanced computer vision.",
    signLanguageRecognitionText:
      "Our neural network can accurately recognize and translate Ukrainian sign language gestures into text.",
    speechToText: "Speech-to-Text",
    speechToTextDesc: "Convert spoken Ukrainian into text for seamless communication.",
    speechToTextText: "Our audio recognition system accurately transcribes spoken Ukrainian language in real-time.",
    interactiveLearning: "Interactive Learning",
    interactiveLearningDesc: "Learn sign language through our interactive training modules.",
    interactiveLearningText:
      "Practice and improve your sign language skills with our guided training system that provides real-time feedback.",
    progressTracking: "Progress Tracking",
    progressTrackingDesc: "Monitor your learning journey with detailed progress analytics.",
    progressTrackingText:
      "Track your improvement over time with comprehensive statistics and personalized recommendations.",

    // Authentication
    loginTitle: "Sign in",
    loginSubtitle: "Choose your preferred sign in method",
    signInWithGoogle: "Sign in with Google",
    orContinueWith: "Or continue with",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?",

    registerTitle: "Create an account",
    registerSubtitle: "Enter your information to create an account",
    signUpWithGoogle: "Sign up with Google",
    name: "Name",
    confirmPassword: "Confirm Password",
    createAccount: "Create account",
    alreadyHaveAccount: "Already have an account?",

    // Dashboard
    welcomeBack: "Welcome back, ",
    openTranslator: "Open Translator",
    startTraining: "Start Training",
    viewProgress: "View Progress",

    // Translator
    translatorTitle: "Translator",
    translatorSubtitle: "Translate between sign language and speech",
    signToText: "Sign Language to Text",
    textToSign: "Speech to Text",
    recognitionSpeed: "Recognition Speed",
    startRecognition: "Start Recognition",
    stopRecognition: "Stop Recognition",
    clear: "Clear",
    copyText: "Copy Text",
    recognizedTextPlaceholder: "Recognized text will appear here...",
    startListening: "Start Listening",
    stopListening: "Stop Listening",
    spokenTextPlaceholder: "Spoken text will appear here...",
    listeningActive: "Listening...",
    microphoneInactive: "Microphone inactive",

    // Training
    trainingTitle: "Sign Language Training",
    trainingSubtitle: "Practice and learn Ukrainian sign language",
    trainingProgress: "Training Progress",
    trackProgress: "Track your progress through the Ukrainian alphabet",
    complete: "complete",
    currentLetter: "Current Letter: ",
    learnToSign: "Learn how to sign this letter",
    previous: "Previous",
    next: "Next",
    practiceSign: "Practice Sign",
    showSignToCamera: "Show your sign to the camera for verification",
    pressStartToBegin: "Press Start to begin",
    correct: "Correct!",
    greatJob: "Great job! You signed correctly.",
    tryAgain: "Try Again",
    signNotRecognized: "Your sign wasn't recognized.",
    startPractice: "Start Practice",
    stop: "Stop",
    showSignForLetter: "Show the sign for letter ",
    analyzingSign: "Analyzing your sign...",

    // Progress
    progressTitle: "Your Progress",
    progressSubtitle: "Track your progress in learning sign language",
    overallProgress: "Overall Progress",
    alphabetMastery: "Alphabet Mastery",
    masteredLetters: "Mastered Letters",
    lettersInProgress: "Letters in Progress",
    lettersToPractice: "Letters to Practice",
    recentActivity: "Recent Activity",
    practiceSession: "Practice Session",
    accuracyRate: "Accuracy Rate",
    lettersPracticed: "Letters Practiced",
    viewDetails: "View Details",
    statisticsTitle: "Statistics",
    practiceTime: "Practice Time",
    totalSessions: "Total Sessions",
    averageAccuracy: "Average Accuracy",
    mostPracticedLetters: "Most Practiced Letters",
    recommendationsTitle: "Recommendations",
    recommendationsText: "Based on your progress, we recommend focusing on the following letters:",
    continueTraining: "Continue Training",

    // About
    aboutTitle: "About Us",
    aboutSubtitle: "Learn more about our mission and team",
    ourMission: "Our Mission",
    ourMissionText:
      "Our mission is to make communication accessible to everyone, regardless of their abilities. We strive to bridge the communication gap between deaf and hearing communities through innovative technological solutions.",
    ourStory: "Our Story",
    ourStoryText:
      "The Ukrainian Sign Language Translator project started as a university project aimed at addressing real-world problems faced by hearing-impaired individuals in Ukraine. Over time, it evolved into a full-fledged platform that uses advanced AI technologies to provide accurate and reliable sign language translation.",
    ourTechnology: "Our Technology",
    ourTechnologyText:
      "We use state-of-the-art computer vision and machine learning technologies to recognize and interpret Ukrainian sign language gestures. Our system continuously learns and improves, providing increasingly accurate results over time.",
    meetTheTeam: "Meet the Team",
    teamMember1: "Oleksandr Petrenko",
    teamMember1Role: "Founder & Project Lead",
    teamMember2: "Maria Kovalenko",
    teamMember2Role: "Lead AI Developer",
    teamMember3: "Ivan Shevchenko",
    teamMember3Role: "Frontend Developer",
    teamMember4: "Natalia Melnyk",
    teamMember4Role: "Sign Language Expert",

    // Contact
    contactTitle: "Contact Us",
    contactSubtitle: "Have questions or suggestions? We'd love to hear from you!",
    contactFormTitle: "Send us a message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    subject: "Subject",
    message: "Message",
    send: "Send",
    contactInfo: "Contact Information",
    address: "Address",
    addressText: "1 Khreshchatyk Street, Kyiv, Ukraine",
    phoneNumber: "Phone Number",
    emailAddress: "Email Address",
    followUs: "Follow Us",

    // Language settings
    language: "Language",
    ukrainian: "Ukrainian",
    english: "English",
  },
}

export function LanguageProvider({ children }) {
  // Отримуємо збережену мову з localStorage або використовуємо українську за замовчуванням
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language")
    return savedLanguage || "uk"
  })

  // Зберігаємо вибрану мову в localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Отримуємо переклади для поточної мови
  const t = translations[language]

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Хук для використання мовного контексту
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
