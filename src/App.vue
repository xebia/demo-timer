<template>
  <div class="app-container">
    <div class="content">
      <Time :seconds="seconds" />
    </div>
    <footer>
      <TimerControls @reset="seconds = initialSeconds" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Time from "./Time.vue";
import TimerControls from "./TimerControls.vue";

const INITIAL_SECONDS = 5 * 60;

export default defineComponent({
  name: "App",
  components: {
    Time,
    TimerControls,
  },
  setup() {
    return {
      initialSeconds: ref(INITIAL_SECONDS),
      seconds: ref(INITIAL_SECONDS + 20),
    };
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
  background: #6c1d5f;
  color: #ffffff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  padding: 0 1rem;
}
.content {
  height: 100%;
  flex: 1;
  padding: 1rem 0;
}
footer {
  padding: 1rem 0;
}
</style>
