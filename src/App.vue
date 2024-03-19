<template>
  <div class="no-mobile">Sorry this app is not (yet) built for touch devices.<br />Just use the native timer app.</div>
  <div class="app-container" :style="{ background: bgColor }">
    <div class="content">
      <Logo v-show="showLogo" class="logo" />
      <EditTimer
        v-if="editing"
        @editing="onSetEditing($event)"
        @change="
          initialSeconds = $event;
          seconds = $event;
        "
        @message="onMessage($event)"
      />
      <Countdown v-else :seconds="seconds" />
    </div>
    <footer class="container">
      <div class="message" v-html="message" />
      <div class="buttons">
        <button @click="onSetEditing(!editing)" :style="{ marginRight: '1rem' }">⚙</button>
        <button v-if="!editing" @click="interval ? pauseTimer() : startTimer()" :style="{ marginRight: '1rem' }">
          {{ interval ? '◼' : '▶' }}
        </button>
        <button
          v-if="!editing"
          @click="
            pauseTimer();
            resetTimer();
          "
        >
          ↺
        </button>
        <div style="flex: 1" />
        <Settings :bgColor="bgColor" @input="onBgColorInput" />
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import EditTimer from './EditTimer.vue';
import Settings from './Settings.vue';
import Countdown from './Countdown.vue';
import Logo from './Logo.vue';

const INITIAL_SECONDS = 5 * 60;

export default defineComponent({
  name: 'App',
  components: { Countdown, EditTimer, Logo, Settings },
  setup() {
    const initialSeconds = ref(INITIAL_SECONDS);
    const seconds = ref(INITIAL_SECONDS);
    const editing = ref(false);
    const bgColor = ref(localStorage.getItem('timer-bgColor') || '#6c1d5f');
    const message = ref<string>();
    const showLogo = ref(true);
    const interval = ref<number>();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'l') {
        showLogo.value = !showLogo.value;
        return;
      }

      // Start/stop/reset timer
      if (!editing.value) {
        switch (e.key) {
          case ' ':
          case 'Enter':
            e.preventDefault();
            if (interval.value) {
              pauseTimer();
            } else {
              startTimer();
            }
            break;
          case 'Escape':
            e.preventDefault();
            pauseTimer();
            resetTimer();
            break;
          case 's':
            if (!interval.value) {
              onSetEditing(true);
            }
            break;
          default:
            break;
        }
      }
    };

    onMounted(() => window.addEventListener('keydown', onKeyDown));
    onUnmounted(() => window.removeEventListener('keydown', onKeyDown));

    const startTimer = () => {
      const endTime = Date.now() + initialSeconds.value * 1000;
      interval.value = setInterval(() => {
        seconds.value = Math.ceil((endTime - Date.now()) / 1000);
      }, 100);
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
      localStorage.setItem('timer-bgColor', bgColor.value);
    };

    const onSetEditing = (value: boolean) => {
      editing.value = value;
      message.value = value
        ? 'Enter a value with numeric keys.<br/>Confirm with <code>Enter</code>. Cancel with <code>Esc</code>.'
        : '';
    };

    const onMessage = (msg: string) => {
      message.value = msg;
      setTimeout(() => (message.value = undefined), 2000);
    };

    return {
      bgColor,
      editing,
      message,
      initialSeconds,
      interval,
      onBgColorInput,
      onMessage,
      onSetEditing,
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
  font-family: 'Proxima Nova';
  src:
    url('assets/proximanova-regular-webfont.woff') format('woff'),
    url('assets/proximanova-regular-webfont.ttf') format('truetype');
}

@font-face {
  font-family: 'Proxima Nova';
  src:
    url('assets/proximanova-bold-webfont.woff') format('woff'),
    url('assets/proximanova-bold-webfont.ttf') format('truetype');
  font-weight: bold;
}

@font-face {
  font-family: 'DigitalDisplay';
  src:
    url('assets/DigitalDisplay.woff') format('woff'),
    url('assets/DigitalDisplay.ttf') format('truetype');
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
  font-family: 'Proxima Nova', monospace;
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
  width: 25vh;
  margin-bottom: 8vh;
}

.buttons {
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

.message {
  height: 1em;
  line-height: 1.5;
}

code {
  color: #222222;
  font-weight: bold;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f7f7f7;
  padding: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.time-display {
  font-family: DigitalDisplay, monospace;
  font-weight: bold;
  font-size: 60vh;
  line-height: 0.75;
}

.no-mobile {
  display: none;
  padding: 1rem 0;
}

@media (hover: none) {
  .app-container {
    display: none;
  }

  .no-mobile {
    display: block;
  }
}
</style>
