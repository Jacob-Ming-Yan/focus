import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import 'vuetify/src/stylus/main.styl'
import store from './store'

Vue.config.productionTip = false;

Vue.mixin({
    methods:{
        wat(){
            return 'wat';
        }
    }
});

Vue.use(Vuex);
Vue.use(Vuetify, {
    iconfont: 'mdi',
    options:{
        customProperties: true
    }
});


new Vue({
    render: h => h(App),
    store: store
}).$mount('#app');
