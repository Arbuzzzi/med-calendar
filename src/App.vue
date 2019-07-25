<template>
  <v-app>
    <app-calendar @click.native="test($refs)"></app-calendar>
  </v-app>
</template>

<script>
import AppCalendar from './components/AppCalendar'

export default {
  name: 'App',
  methods: {
    test(data) {
      // console.log(data);
    }
  },
  components: {
    AppCalendar
  },
  data () {
    return {
      //
    }
  }
}
</script>
