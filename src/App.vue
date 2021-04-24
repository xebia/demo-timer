<template>
  <div>
    {{ time }}
    <TimerControls />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import TimerControls from "./TimerControls.vue";

const leftPad = (v: number): string =>
  v.toString().length < 2 ? `0${v}` : v.toString();

export default defineComponent({
  name: "App",
  components: {
    TimerControls,
  },
  setup() {
    const seconds = ref(5 * 60);
    const time = computed(() => {
      const s = seconds.value;
      return `${Math.floor(s / 60)}:${leftPad(s % 60)}`;
    });

    return { time };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
