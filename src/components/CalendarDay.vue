<template>
    <!--day is a moment object so we can use the format method that is included with day-->
    <div :class="classObject" @click="captureClick">
        {{ day.format('D') }}
        <ul class="event-list">
            <li v-for="event in events">{{ event.description }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: [ 'day' ],
        computed: {
            events() {
                //moved mock data to store
                //TODO: Go over the reasons this works again
                return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'));
            },
            classObject(){
                let today = this.day.isSame(this.$moment(), 'day');
                return {
                  day: true,
                  today,
                  past: this.day.isSameOrBefore(this.$moment(), 'day') && !today
                };
            }
        },
        methods: {
            captureClick(event){
                this.$store.commit('eventFormPos', { x: event.clientX, y: event.clientY});
                this.$store.commit('eventFormActive', true);
            }
        }
    }
</script>