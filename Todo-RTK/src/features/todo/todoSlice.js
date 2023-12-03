import { createSlice } from "@reduxjs/toolkit";

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

const initialState = {
    todos : demoTodo
}

// const handleAddTodo = (record) => {
//     console.log(record)
//     console.log("Add Todo")

//     // initialState.todos.map(prev => {
//     //     return {
//     //         ...prev,
//     //         record
//     //     }
//     // })
//     console.log(initialState)
// }
// const handleEditTodo = (record) => {
//     console.log(record)
//     console.log("Edit Todo")
// }
// const handleDeleteTodo = (record) => {
//     console.log(record)
//     console.log("Delete Todo")
// }

const todoSlice = createSlice({

    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
            
            // console.log(state.todos)
            // handleAddTodo(action.payload)
        },
        editTodo: (state, action) => {
            const editedTodos = action.payload
            console.log(editedTodos)
            state.todos = editedTodos

            // console.log(state)
            // const index = state.todos.indexOf(todo => todo.key == action.payload.key)
            // console.log(index)
            // handleEditTodo(action.payload)
        },
        deleteTodo: (state, action) => {
            console.log(action.payload)
            const updatedTodos = action.payload
            state.todos = updatedTodos

            // const selectedTodoKey = action.payload.key
            // console.log(selectedTodoKey)
            // state.todos.filter(todo => todo.key !== selectedTodoKey)

            // handleDeleteTodo(action.payload)
        },
        toggleTodo: (state, action) => {
            console.log(action.payload)
            const toggledTodo = action.payload
            console.log(toggledTodo)

            const index = state.todos.findIndex(todo => todo.key === toggledTodo.key)
            console.log(`index`)
            console.log(index)
            
            if(index !== -1){
                let prevState = state.todos[index].completed
                console.log(state.todos[index].completed)
                // state.todos[index].completed = !state.todos.completed
                state.todos[index].completed = !prevState
                console.log(state.todos[index].completed)
            }
            // state.todos = toggleTodo
        }
    }

})

export default todoSlice.reducer

export const { addTodo, editTodo, deleteTodo, toggleTodo } = todoSlice.actions