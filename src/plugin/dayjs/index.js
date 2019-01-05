import dayjs from 'dayjs'

export default {
    install(Vue, options) {
        Vue.prototype.$dayjs = dayjs;

        Vue.filter('dFormat', (item, opts) => {
            return dayjs(item).format(opts || 'YYYY-MM-DD HH:mm:ss');
        })
    }
}
