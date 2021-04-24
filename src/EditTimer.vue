<template>
  <div class="time-display">{{ formattedTimerSequence }}</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "EditTimer",
  setup(props, { emit }) {
    const timerSequence = ref("");
    const formattedTimerSequence = computed(() => {
      switch (timerSequence.value.length) {
        case 0:
          return "_:__";
        case 1:
          return `_:_${timerSequence.value}`;
        case 2:
          return `_:${timerSequence.value}`;
        default:
          return `${timerSequence.value.slice(
            0,
            -2
          )}:${timerSequence.value.slice(-2)}`;
      }
    });

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          emit("editing", false);
          break;
        case "Enter": {
          emit("editing", false);
          const split = +timerSequence.value.length - 2;
          const secs = +timerSequence.value.substring(split);
          if (secs < 60) {
            emit(
              "change",
              +timerSequence.value.substring(0, split) * 60 + secs
            );
          } else {
            emit("error", "Seconds must be under 60");
          }
          break;
        }
        default:
          // Enter numbers (max 4)
          if (!isNaN(parseInt(e.key, 10))) {
            timerSequence.value += e.key;
            if (timerSequence.value.length > 4) {
              timerSequence.value = timerSequence.value.substring(1);
            }
          }
          break;
      }
    };

    onMounted(() => window.addEventListener("keydown", onKeyDown));
    onUnmounted(() => window.removeEventListener("keydown", onKeyDown));

    return { formattedTimerSequence };
  },
});
</script>

<style scoped>
.time-display {
  font-family: DigitalDisplay, monospace;
  font-weight: bold;
  height: 100%;
  line-height: 0;
  font-size: 35vw;
  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: underline;
  text-decoration-color: red;
  text-decoration-thickness: 2rem;
  text-decoration-style: dotted;
  text-underline-offset: 3rem;
}
</style>
