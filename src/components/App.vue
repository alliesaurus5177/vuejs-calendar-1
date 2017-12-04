<template>
    <div>
        <div v-for="week in weeks">
            Week
            <div v-for="day in week" :day="day"></div>
        </div>

    </div>
</template>

<script>
    import CalendarDay from './CalendarDay.vue';

    export default {
        data() {
            return {
                month: 2, //temporary
                year: 2017
            };
        },
        computed: {
          days() {
              //Generating all days in current month
              let days = [];
              let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
              do {
                  days.push(currentDay);
                  currentDay = this.$moment(currentDay).add(1, 'days');
              } while((currentDay.month() + 1) == this.month);

              //add 'padding' days so that there are neat grids
              //add previous days to start of month
              const SUNDAY = 0;
              const MONDAY = 1;

              currentDay = this.$moment(days[0]);
              if (currentDay.day() !== MONDAY){
                  do {
                      currentDay = this.$moment(currentDay).subtract(1, 'days');
                      days.unshift(currentDay); //unshift pushes to start of array
                  } while(currentDay.day() !== MONDAY);
              }

              //add days to end of month
              currentDay = this.$moment(days[days.length -1]); //grabs last day of month
              if (currentDay.day() !== SUNDAY ) {
                  do {
                      currentDay = this.$moment(currentDay).add(1, 'days');
                      days.push(currentDay);
                  } while(currentDay.day() !== SUNDAY);
              }
              return days;
          },
            weeks() {
              let weeks = [];
              let week = []; //will be filled with 7 days, then pushed to weeks

              for (let day of this.days) {
                  week.push(day);
                  if(week.length === 7 ) {
                      weeks.push(week);
                      week = [];
                  }
              }
              return weeks;
            },
        },
        created() {
            console.log(this.$moment);
        }
    }

</script>