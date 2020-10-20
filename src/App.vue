<template>
  <div id="app">
    <h1>Google Map Tools</h1>
    <div class="mapArea">
      <!-- <ToolBar /> -->
      <Map />
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map.vue';
// import ToolBar from '@/components/ToolBar.vue';

export default {
  name: 'App',
  data() {
    return {
      clickedPos: []
    }
  },
  components: {
    // ToolBar,
    Map
  },
  methods: {
    consoleView(e) {
      console.log(e.latLng.lat())
      // let clickPosition = e.latLng;
      // clickedPos.push({lat: clickPosition.lat(), lng: clickPosition.lng()})
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

h1 {
  margin: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
