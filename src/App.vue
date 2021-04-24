<template>
  <div class="app-container" :style="{ background: bgColor }">
    <div class="content">
      <EditTimer
        v-if="editing"
        @editing="editing = $event"
        @change="
          initialSeconds = $event;
          seconds = $event;
        "
        @error="showError($event)"
      />
      <Time v-else :seconds="seconds" />
    </div>
    <footer>
      <Settings :bgColor="bgColor" @input="onBgColorInput" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import EditTimer from "./EditTimer.vue";
import Settings from "./Settings.vue";
import Time from "./Time.vue";

const INITIAL_SECONDS = 5 * 60;

export default defineComponent({
  name: "App",
  components: { EditTimer, Settings, Time },
  setup() {
    const initialSeconds = ref(INITIAL_SECONDS);
    const seconds = ref(INITIAL_SECONDS);
    const editing = ref(false);
    const bgColor = ref(localStorage.getItem("timer-bgColor") || "#6c1d5f");
    let interval: number | undefined;

    const onKeyDown = (e: KeyboardEvent) => {
      // Start/stop/reset timer
      if (!editing.value) {
        switch (e.key) {
          case " ":
          case "Enter":
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
          case "s":
            if (!interval) {
              editing.value = true;
            }
            break;
          default:
            break;
        }
      }
    };

    onMounted(() => window.addEventListener("keydown", onKeyDown));
    onUnmounted(() => window.removeEventListener("keydown", onKeyDown));

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
      seconds.value = initialSeconds.value;
    };

    onUnmounted(pauseTimer);

    const onBgColorInput = (e: MouseEvent) => {
      bgColor.value = (e.target as HTMLInputElement).value;
      localStorage.setItem("timer-bgColor", bgColor.value);
    };

    return {
      bgColor,
      editing,
      initialSeconds,
      onBgColorInput,
      seconds,
      showError: (e: string) => console.log(e),
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
