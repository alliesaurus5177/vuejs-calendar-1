<template>
    <div id="event-form" :class="{ active: active }" :style="{ top: top, left: left }">
        <h4>Add an Event</h4>
        <button id="close-button" @click="close">&#10005</button>
    </div>
</template>

<script>
    export default {
        computed: {
            active() {
                return this.$store.state.eventFormActive;
            },
            top() {
                return `${this.$store.state.eventFormPosY}px`;
            },
            left() {
                return `${this.$store.state.eventFormPosX}px`;
            }
        },
        methods: {
            close() {
                this.$store.commit('eventFormActive', false);
            }
        }
    }
</script>