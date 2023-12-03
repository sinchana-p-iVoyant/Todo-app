import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios'

const demoTodo = [
    {
      key: 1,
      text: 'Todo1',
      dateTime: "10/24/2023, 10:52:37 AM",
      date: "10/24/2023",
      time: "10:52:37 AM",
      completed: false
    },
    {
      key: 2,
      text: 'Todo2',
      dateTime: "10/24/2023, 10:52:37 AM",
      date: "10/24/2023",
      time: "10:52:37 AM" ,
      completed: false
    },
    ]

// export const fetchTodos = createAsyncThunk('todo/fetchTodos', () => {
//     return axios
//              .get('https://jsonplaceholder.typicode.com/todos?_limit=5',{
//                 timeout: 5000
//               })
//              .then(response => response.data)
    
//     // const response = axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
//     // console.log(response)
//     // const todoData = response.json()
//     // console.log(todoData)
// })   

// export const postTodos = createAsyncThunk('todo/postTodos', () => {
//     return axios
//              .post('https://jsonplaceholder.typicode.com/todos',{
//                 id: 701,
//                 title: 'new',
//                 completed: false
//               })
//              .then(response => response.data)

// }) 

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    // console.log(response.data)

    return response.data
    // const todoData = response.json()
    // console.log(todoData)
}) 

// return value from "createAsyncThunk" will be the "payload" of the action.
export const postTodos = createAsyncThunk('todo/postTodos', async (newTodo) => {
    console.log(newTodo)
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
    console.log(response)
    return response.data

})    


// console.log(fetchTodos)

// const getTodoApi = async () => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
//     console.log(response)
//     const todoData = response.data
//     console.log(todoData)
// }

// {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   },

// let todo = getTodo()
// console.log(todo)

const initialState = {
    todos : []
}


const todoSlice = createSlice({

    name: 'todo',
    initialState,
    reducers: {
        // getTodo: (state, action) => {
        //     const todo = getTodoApi()
        //     console.log(todo)
        //     // state.todos 
            
        
        // },
        addTodo: (state, action) => {
            let updatedTodos = postTodos()
            state.todos = updatedTodos
            // state.todos.push(action.payload)
            
        
        },
        editTodo: (state, action) => {
            const editedTodos = action.payload
            console.log(editedTodos)
            state.todos = editedTodos

        },
        deleteTodo: (state, action) => {
            console.log(action.payload)
            const updatedTodos = action.payload
            state.todos = updatedTodos

            
        },
        toggleTodo: (state, action) => {
            console.log(action.payload)
            const toggledTodo = action.payload
            console.log(toggledTodo)

            const index = state.todos.findIndex(todo => todo.id === toggledTodo.id)
            console.log(`index`)
            console.log(index)
            
            if(index !== -1){
                let prevState = state.todos[index].completed
                console.log(`prev: ${state.todos[index].completed}`)
                // state.todos[index].completed = !state.todos.completed
                state.todos[index].completed = !prevState
                console.log(`Later: ${state.todos[index].completed}`)
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false
            state.todos = action.payload
            state.error = ''
            // console.log(state.todos)
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false
            state.todos = []
            state.error = action.error.message
        })
        builder.addCase(postTodos.fulfilled, (state, action) => {
            console.log(action.payload)
            state.todos.push(action.payload)            
            // state.todos = action.payload            
        })
    }
})

export default todoSlice.reducer
export const { addTodo, editTodo, deleteTodo, toggleTodo } = todoSlice.actions

