<template>
    <div class="todo todo__input">
        <div class="todo-wrapper todo-wrapper__input">
        <div style="todo-circle-wrapper">
            <div class="todo-circle todo-circle__input"></div>
        </div>
        <form v-on:submit.prevent="addTodo">
            <input class="todo-content todo-text" type="text" placeholder="Create a new todo..." v-model="todoVal">
        </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'

export default defineComponent({
    setup() {
        const todoVal = ref ("")
        const store = useStore(key)
        
        return {
            todoVal,
            addTodo: () => {store.commit('addTodo', todoVal.value); todoVal.value = ""}
        }
    },
})
</script>
