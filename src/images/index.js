import Vue from 'vue'
import "../images/iconfont.css"
import App from '../app.vue'

// vueApp
var vueApp = new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
})