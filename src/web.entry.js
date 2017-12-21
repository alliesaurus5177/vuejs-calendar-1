import Vue from 'vue';
import './style.scss';

import store from './store';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import App from './components/App.vue';


//once page refreshes acn call initial state, which contains events.
let events = window.__INITIAL_STATE__.map(event => {
    return {
        description: event.description,
        date: moment(event.date)
    }
});
//Create InitialState object to put in our Store to grab events
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
    store, //replaces <div id="app"> div in index
        render(createElement) {
           return createElement(
                'div',
                { attrs: { id:'app' } },
                [
                    createElement('app') //creates <app></app> nested in div id "app"
                ]
            );
        }

});