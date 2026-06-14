import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 静态导入翻译文件
import zhTranslation from './locales/zh.json'
import enTranslation from './locales/en.json'

// 调试：打印翻译文件加载状态
console.log('[i18n] 🔍 翻译文件加载状态：')
console.log('[i18n] 📄 zh.json keys:', Object.keys(zhTranslation))
console.log('[i18n] 📄 en.json keys:', Object.keys(enTranslation))

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh',
    lng: 'zh',
    debug: true, // 开启调试模式
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false, // 禁用 Suspense 避免加载问题
    },
    // 将所有翻译合并到一个默认命名空间 'translation'
    // 这样 t('common.xxx') 会正确查找 zh.common.xxx
    resources: {
      zh: {
        translation: zhTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
  })
  .then(() => {
    console.log('[i18n] ✅ i18next 初始化成功')
    console.log('[i18n] 🌐 当前语言:', i18n.language)
    // 测试翻译 - 使用正确的 key 路径
    console.log('[i18n] 🧪 测试翻译 common.name:', i18n.t('common.name'))
    console.log('[i18n] 🧪 测试翻译 common.dashboard:', i18n.t('common.dashboard'))
    console.log('[i18n] 🧪 测试翻译 common.theme:', i18n.t('common.theme'))
    console.log('[i18n] 🧪 测试翻译 common.typeACommandOrSearch:', i18n.t('common.typeACommandOrSearch'))
  })
  .catch((err) => {
    console.error('[i18n] ❌ i18next 初始化失败:', err)
  })

// 监听语言变化
i18n.on('languageChanged', (lng) => {
  console.log('[i18n] 🔄 语言切换为:', lng)
})

export default i18n
