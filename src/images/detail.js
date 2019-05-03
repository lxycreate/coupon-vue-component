import Vue from 'vue'
import "../images/iconfont.css"
import Detail from '../detail.vue'

// vueApp
var vueApp = new Vue({
    el: '#detail',
    template: '<Detail/>',
    components: {
        Detail
    }
})