import Vue from 'vue'
import "../images/iconfont.css"
import App from '../app.vue'

// 用于任意组件之间通信的变量
var bus = new Vue();
// vueApp
var vueApp = new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
})