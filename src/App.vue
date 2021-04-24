<template>
  <div class="app-container" :style="{ background: bgColor }">
    <div class="content">
      <Time :seconds="seconds" />
    </div>
    <footer>
      <Settings :bgColor="bgColor" @input="onBgColorInput" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import Settings from "./Settings.vue";
import Time from "./Time.vue";

const INITIAL_SECONDS = 5 * 60;

export default defineComponent({
  name: "App",
  components: { Settings, Time },
  setup(props) {
    const seconds = ref(10);
    const bgColor = ref(localStorage.getItem("timer-bgColor") || "#6c1d5f");
    let interval: number | undefined;

    const keyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          e.preventDefault();
          if (interval) {
            pauseTimer();
          } else {
            startTimer();
          }
          break;
        case "Escape":
          e.preventDefault();
          pauseTimer();
          resetTimer();
          break;
        default:
      }
    };

    onMounted(() => window.addEventListener("keydown", keyDown));
    onUnmounted(() => window.removeEventListener("keydown", keyDown));

    const startTimer = () => {
      interval = setInterval(() => {
        seconds.value--;
      }, 1000);
    };

    const pauseTimer = () => {
      interval && clearInterval(interval);
      interval = undefined;
    };

    const resetTimer = () => {
      seconds.value = INITIAL_SECONDS;
    };

    onUnmounted(pauseTimer);

    const onBgColorInput = (e: MouseEvent) => {
      bgColor.value = (e.target as HTMLInputElement).value;
      localStorage.setItem("timer-bgColor", bgColor.value);
    };

    return {
      bgColor,
      initialSeconds: ref(INITIAL_SECONDS),
      onBgColorInput,
      seconds,
    };
  },
});
</script>

<style lang="scss">
@font-face {
  font-family: "Proxima Nova";
  src: url("assets/proximanova-regular-webfont.woff") format("woff"),
    url("assets/proximanova-regular-webfont.ttf") format("truetype");
}
@font-face {
  font-family: "Proxima Nova";
  src: url("assets/proximanova-bold-webfont.woff") format("woff"),
    url("assets/proximanova-bold-webfont.ttf") format("truetype");
  font-weight: bold;
}

@font-face {
  font-family: "DigitalDisplay";
  src: url("assets/DigitalDisplay.woff") format("woff"),
    url("assets/DigitalDisplay.ttf") format("truetype");
  font-weight: bold;
}

html,
body {
  height: 100%;
  margin: 0;
}

#app {
  background: #6c1d5f;
  color: #ffffff;
  font-family: "Proxima Nova", monospace;
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
