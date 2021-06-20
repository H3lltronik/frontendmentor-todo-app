<template>
  <main class="page">
    <div class="page-header background-center"></div>
    <div class="page-bottom"></div>

    <section class="todos centered">
      <div class="container">
        <header class="header">
          <div class="title">TODO</div>
          <button class="theme-switcher background-center" @click="toggleTheme ()"></button>
        </header>

        <TodoInput/>

        <Todos/>

      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import './assets/styles/main.css';
import { appThemes } from './config';
import { key } from './store';
import { switchTheme } from './utils';
import icons from './utils/icons';
import Todos from './components/Todos.vue';
import TodoInput from './components/TodoInput.vue';

export default defineComponent({
  name: 'App',
  components: {
    Todos,
    TodoInput
},
  setup () {
    const store = useStore(key)
    const theme = computed(() => store.getters.theme)

    onMounted (() => {
      if (theme.value) {
        switchTheme (theme.value)
      }
    })

    const toggleTheme = () => {
      let themeToToggle = ""
      if (theme.value == appThemes.light) {
        themeToToggle = appThemes.dark
      }
      else if (theme.value == appThemes.dark) {
        themeToToggle = appThemes.light
      }
      switchTheme (themeToToggle)
      console.log(themeToToggle, theme)
    }

    return {
      icons,
      toggleTheme
    }
  },
})
</script>

<style>
</style>
