import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en.json'
import tw from './tw.json'
Vue.use(VueI18n)

const messages = {
    'tw':tw,
    'en':en
}

const i18n = new VueI18n({
    /** 默认值 */
    locale:'tw',
    fallbackLocale: 'tw',
    messages
})

export default i18n