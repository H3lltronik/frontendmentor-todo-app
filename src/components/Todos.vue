<template>
    <div class="todos-box">
        <draggable v-model="todosArr" item-key="id">
            <template #item="{element}">
                <div class="todo" :class="{'todo__checked': isChecked(element.status)}" :key="element.id" @click="toggleStatus (element.id)">
                    <div class="todo-wrapper">
                        <div style="todo-circle-wrapper">
                        <div class="todo-circle">
                            <div class="todo-circle-marker icon icon-check"></div>
                        </div>
                        </div>
                        <span class="todo-content todo-text">{{element.text}}</span>
                    </div>
                </div>
            </template>
        </draggable>

        <div class="todos-box-footer todo-text">
        <span class="todos-box-information">{{activeTodos.length}} items remaing</span>
        
        <div class="todos-box-options">
            <span class="todos-box-option" :class="{'todos-box-option__active': item.id == currentFilterId}"
            @click="setFilter(item.id)" v-for="(item) in filters" :key="item.id">
                {{item.name}}
            </span>
        </div>

        <span class="todos-box-option" @click="clearTodos">Clear completed</span>
        </div>
        
    </div>
    
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'

export default {
    components: {
        draggable,
    },
    setup() {
        const drag = ref(false)
        const store = useStore(key)

        return {
            drag,
            filters: store.state.filters,
            activeTodos: computed (() => (store.getters.activeTodos)),
            currentFilterId: computed (() => (store.state.currentFilterId)),
            setFilter: (id: number) => {store.commit('setFilter', id)},
            clearTodos: () => {store.commit('setTodos', [])},
            isChecked: (status: string) => (status == 'completed'),
        }
    },
    computed: {
        todosArr: {
            get () : any {
                return this.$store.getters.todos
            },
            set (value : any) {
                this.$store.commit('setTodos', value)
            }
        }
    },
    methods: {
        toggleStatus (id: number) {
            this.$store.commit('toggleStatus', id)
        },
    }
}
</script>
