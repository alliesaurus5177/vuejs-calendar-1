import Vue from 'vue';
import './style.scss';

import store from './store';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import App from './components/App.vue';

/*let events = [
    { description: 'Random event 1', date: moment('2017-02-06', 'YYYY-MM-DD') },
    { description: 'Random event 2', date: moment('2017-02-15', 'YYYY-MM-DD') },
    { description: 'Random event 3', date: moment('2017-03-14', 'YYYY-MM-DD') }
];*/

let events = window.__INITIAL_STATE__.map(event => {
    return {
        description: event.description,
        date: moment(event.date)
    }
});

let initialState = Object.assign({}, store.state, { events });
console.log(initialState);
store.replaceState(initialState);

new Vue({
    el: '#app',
    data: {
        moment
    },
    components: {
        App
    },
    store
});