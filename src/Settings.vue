<template>
  <div class="container">
    <button @click="toggleHelp">?</button>
    <div class="sidepanel" v-show="showHelp">
      <h2>Keyboard shortcuts</h2>
      <ul>
        <li><code>Space</code> Start / pause timer</li>
        <li><code>Esc</code> Reset timer</li>
        <li><code>?</code> Toggle help/settings</li>
      </ul>
      <h2>Settings</h2>
      <label> <input type="color" :value="bgColor" /> Background color </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "Settings",
  props: { bgColor: { type: String, required: true } },
  setup(props) {
    console.log(props.bgColor);
    const toggleHelp = () => (showHelp.value = !showHelp.value);

    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "?") {
        e.preventDefault();
        toggleHelp();
      }
    };

    onMounted(() => window.addEventListener("keydown", keyDown));
    onUnmounted(() => window.removeEventListener("keydown", keyDown));

    const showHelp = ref(false);
    return { showHelp, toggleHelp };
  },
});
</script>

<style scoped lang="scss">
.container {
  text-align: right;
}
button {
  cursor: pointer;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid #fff;
  border-radius: 4px;
  background: transparent;
  opacity: 0.2;
  &:hover {
    background: #666;
  }
}
.sidepanel {
  color: #2c3e50;
  box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.15);
  position: absolute;
  width: 300px;
  background: #fff;
  right: 1rem;
  top: 1rem;
  padding: 2rem;
  text-align: left;
}
code {
  color: #2c3e50;
  font-weight: bold;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f7f7f7;
  padding: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

h2 {
  margin-top: 0;
}
ul {
  color: #9d92b2;
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
}
li {
  margin-bottom: 0.75rem;
}
label {
  color: #9d92b2;
}
input {
  margin-right: 0.5rem;
}
</style>
