<template>
  <div class="container">
    <div class="time-display" :class="{ blink: seconds <= 0 }">{{ time }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

const leftPad = (v: number): string => (v.toString().length < 2 ? `0${v}` : v.toString());
const round = (v: number): string => `${v < 0 ? '-' : ''}${Math.floor(Math.abs(v))}`;

export default defineComponent({
  name: 'Countdown',
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
@keyframes blink-animation {
  to {
    visibility: hidden;
  }
}
.blink {
  animation: blink-animation 1s steps(5, start) infinite;
}
</style>
