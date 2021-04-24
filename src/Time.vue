<template>
  <div class="container">
    <div class="time-display">{{ time }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

const leftPad = (v: number): string =>
  v.toString().length < 2 ? `0${v}` : v.toString();
const round = (v: number): string =>
  `${v < 0 ? "-" : ""}${Math.floor(Math.abs(v))}`;

export default defineComponent({
  name: "Time",
  props: {
    seconds: { type: Number, required: true },
  },
  setup(props) {
    return {
      time: computed(() => {
        const s = props.seconds;
        return `${round(s / 60)}:${leftPad(Math.abs(s % 60))}`;
      }),
    };
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
}
.container {
  height: 100%;
}
</style>
