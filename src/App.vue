<template>
  <div class="container">
    <Time :seconds="seconds" class="time" />
    <TimerControls class="text" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Time from "./Time.vue";
import TimerControls from "./TimerControls.vue";

export default defineComponent({
  name: "App",
  components: {
    Time,
    TimerControls,
  },
  setup() {
    return { seconds: ref(5 * 60) };
  },
});
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.time {
  flex: 1;
}
</style>
