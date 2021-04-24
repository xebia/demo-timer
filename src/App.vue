<template>
  <div class="app-container">
    <div class="content">
      <Time :seconds="seconds" />
    </div>
    <footer>
      <TimerControls
        @start="startTimer"
        @pause="pauseTimer"
        @reset="resetTimer"
      />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from "vue";
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
    const seconds = ref(10);
    let interval: number;
    const startTimer = () => {
      interval = setInterval(() => {
        seconds.value--;
      }, 1000);
    };

    const pauseTimer = () => {
      interval && clearInterval(interval);
    };

    const resetTimer = () => {
      pauseTimer();
      seconds.value = INITIAL_SECONDS;
    };

    onUnmounted(pauseTimer);

    return {
      initialSeconds: ref(INITIAL_SECONDS),
      seconds,
      startTimer,
      pauseTimer,
      resetTimer,
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
