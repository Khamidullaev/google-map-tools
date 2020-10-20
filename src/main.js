import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import store from './store';
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCjET2klXlywZGh2qo48lgMQ0CUyxntwEo',
    libraries: 'places',
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
