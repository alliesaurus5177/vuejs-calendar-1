import Vue from 'vue'
import './style.scss'

import moment from 'moment-timezone';
moment.tz.setDefault('UTC'); //done in order to grab correct timezone wherever you are
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import App from './components/App.vue';

;

new Vue({
  el: '#app',
  data: {
    moment
  },
    components: {
      App
    }
});
