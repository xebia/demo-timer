<template>
  <div class="container">
    <code>?</code>
    <div v-show="showHelp">HELP</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export enum TimerState {
  Stopped,
  Started,
}

export default defineComponent({
  name: "TimerControls",
  setup(_, { emit }) {
    const toggleHelp = () => (showHelp.value = !showHelp.value);
    const timerState = ref<TimerState>(TimerState.Stopped);

    const keyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "?":
          toggleHelp();
          break;
        case " ":
          if (timerState.value === TimerState.Stopped) {
            timerState.value = TimerState.Started;
            emit("start");
          } else {
            timerState.value = TimerState.Stopped;
            emit("pause");
          }
          break;
        case "Escape":
          timerState.value = TimerState.Stopped;
          emit("reset");
          break;
        default:
      }
    };

    onMounted(() => window.addEventListener("keydown", keyDown));
    onUnmounted(() => window.removeEventListener("keydown", keyDown));

    const showHelp = ref(false);
    return { showHelp };
  },
});
</script>

<style scoped lang="scss">
.container {
  opacity: 0.2;
  text-align: right;
}
code {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  color: #2c3e50;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f7f7f7;
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: right;
}
</style>
