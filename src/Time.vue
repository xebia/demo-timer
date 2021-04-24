<template>
  <div>
    {{ time }}
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

<style scoped></style>
