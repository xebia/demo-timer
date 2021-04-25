<template>
  <div class="app-container" :style="{ background: bgColor }">
    <div class="content">
      <Logo v-show="showLogo" :style="{ width: '15vw' }" class="logo" />
      <EditTimer
        v-if="editing"
        @editing="editing = $event"
        @change="
          initialSeconds = $event;
          seconds = $event;
        "
        @error="onError($event)"
      />
      <Time v-else :seconds="seconds" />
      <div v-if="error" class="error">{{ error }}</div>
    </div>
    <footer class="container">
      <button
        @click="interval ? pauseTimer() : startTimer()"
        :style="{ marginRight: '1rem' }"
      >
        {{ interval ? "◼" : "▶" }}
      </button>
      <button
        @click="
          pauseTimer();
          resetTimer();
        "
        :style="{ marginRight: '1rem' }"
      >
        ↺
      </button>
      <button @click="editing = !editing">⚙</button>
      <div style="flex: 1" />
      <Settings :bgColor="bgColor" @input="onBgColorInput" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import EditTimer from "./EditTimer.vue";
import Settings from "./Settings.vue";
import Time from "./Time.vue";
import Logo from "./Logo.vue";

const INITIAL_SECONDS = 5 * 60;

export default defineComponent({
  name: "App",
  components: { EditTimer, Logo, Settings, Time },
  setup() {
    const initialSeconds = ref(INITIAL_SECONDS);
    const seconds = ref(INITIAL_SECONDS);
    const editing = ref(false);
    const bgColor = ref(localStorage.getItem("timer-bgColor") || "#6c1d5f");
    const error = ref<string>();
    const showLogo = ref(true);
    const interval = ref<number>();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "l") {
        showLogo.value = !showLogo.value;
        return;
      }

      // Start/stop/reset timer
      if (!editing.value) {
        switch (e.key) {
          case " ":
          case "Enter":
            e.preventDefault();
            if (interval.value) {
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
            if (!interval.value) {
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
      interval.value = setInterval(() => {
        seconds.value--;
      }, 1000);
    };

    const pauseTimer = () => {
      interval.value && clearInterval(interval.value);
      interval.value = undefined;
    };

    const resetTimer = () => {
      seconds.value = initialSeconds.value;
    };

    onUnmounted(pauseTimer);

    const onBgColorInput = (e: MouseEvent) => {
      bgColor.value = (e.target as HTMLInputElement).value;
      localStorage.setItem("timer-bgColor", bgColor.value);
    };

    const onError = (msg: string) => {
      error.value = msg;
      setTimeout(() => (error.value = undefined), 2000);
    };

    return {
      bgColor,
      editing,
      error,
      initialSeconds,
      interval,
      onBgColorInput,
      onError,
      pauseTimer,
      resetTimer,
      seconds,
      startTimer,
      showLogo,
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
  padding-left: 1rem;
  padding-right: 1rem;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 1;
  padding: 1rem 0;
}
.logo {
  margin-bottom: 8vw;
}
footer {
  display: flex;
  align-items: flex-end;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
button {
  cursor: pointer;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid #ffffff;
  border-radius: 4px;
  background: transparent;
  opacity: 0.2;
  &:hover {
    background: #5a5a5a;
  }
}
</style>
