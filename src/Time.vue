<template>
  <div class="container">
    <div class="time-display">{{ time }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

const leftPad = (v: number): string =>
  v.toString().length < 2 ? `0${v}` : v.toString();

export default defineComponent({
  name: "Time",
  props: {
    seconds: { type: Number, required: true },
  },
  setup(props) {
    return {
      time: computed(
        () => `${Math.floor(props.seconds / 60)}:${leftPad(props.seconds % 60)}`
      ),
    };
  },
});
</script>

<style scoped>
.time-display {
  height: 100%;
  line-height: 0;
  font-size: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  height: 100%;
}
</style>
