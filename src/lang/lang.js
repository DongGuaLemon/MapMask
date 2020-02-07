import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en.json'
import tw from './tw.json'
import cn from './cn.json'
import vn from './vn.json'
import pt from './pt.json'
Vue.use(VueI18n)

const messages = {
    'tw':tw,
    'en':en,
    'cn':cn,
    'vn':vn,
    'pt':pt
}

const i18n = new VueI18n({
    /** 默认值 */
    locale:'tw',
    fallbackLocale: 'tw',
    messages
})

export default i18n