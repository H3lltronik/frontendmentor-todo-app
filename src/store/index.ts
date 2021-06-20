import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { defaultTheme } from '../config'

export interface State {
    theme: string,
    todos: Todo[],
    filters: Filter[],
    currentFilterId: number
}

export const store = createStore<State>({
    state () {
      return {
        theme: defaultTheme,
        todos: [
          {
            id: 1,
            status: 'active',
            text: "Texto de prueba 1"
          },
          {
            id: 2,
            status: 'active',
            text: "Texto de prueba 2"
          },
          {
            id: 3,
            status: 'active',
            text: "Texto de prueba 3"
          },
          {
            id: 4,
            status: 'completed',
            text: "Texto de prueba 4"
          },
          {
            id: 5,
            status: 'active',
            text: "Texto de prueba 5"
          },
        ],
        filters: [
          {
            id: 0,
            name: "All",
            value: (todo) => (true),
          },
          {
            id: 1,
            name: "Active",
            value: (todo) => (todo.status == 'active'),
          },
          {
            id: 2,
            name: "Completed",
            value: (todo) => (todo.status == 'completed'),
          },
        ],
        currentFilterId: 0,
      }
    },
    mutations: {
      changeTheme (state, payload) {
          state.theme = payload
      },
      addTodo (state, todo: string) {
        state.todos.push({
          id: state.todos.length + 1,
          status: 'active',
          text: todo
        })
      },
      setTodos (state, todos: Todo[]) {
        state.todos = todos
      },
      setFilter (state, id: number) {
        const filter = state.filters.find (f => f.id == id)
        if (filter) state.currentFilterId = filter.id
      },
      toggleStatus (state, id: number) {
        const found = state.todos.find (t => t.id == id)
        if (!found) return
        if (found.status == 'completed') found.status = 'active';
        else if (found.status == 'active') found.status = 'completed';
      },
    },
    getters: {
        theme: (state) => (state.theme),
        todos: (state, {currentFilterId}) => {
          const filter = currentFilterId
          if (!filter) return []
          return state.todos.filter(filter.value)
        },
        activeTodos: (state) => {
          const filter = state.filters.find (f => f.name == 'Active')
          console.log(filter)
          if (!filter) return []
          return state.todos.filter(filter.value)
        },
        currentFilterId: (state) => (state.filters?.find (f => f.id == state.currentFilterId) ?? [])
    }
})

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()