import React, { useEffect, useState } from 'react'
import { Input, Table, Tag } from 'antd';
import { PlusOutlined, PlusSquareTwoTone, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid';

import './Todo.css'

const Todo = () => {

  const demoTodo = [
    {
      key: 1,
      text: 'Todo1',
      dateTime: "Mon Oct 23 2023 15:37:58",
      completed: false
    },
    {
      key: 2,
      text: 'Todo2',
      dateTime: "Mon Oct 23 2023 15:37:58",
      completed: false
    },
  ]


  const [todos, setTodos] = useState(demoTodo)
  const [input, setInput] = useState("")

  // const [complete, setComplete] = useState(false)
  const [currentDateTime, setCurrentDateTime] = useState()

  useEffect(() => {
    let dateTime = new Date()
    console.log(dateTime)
    setCurrentDateTime(dateTime)
  },[])

  const handleCheck = (record) => {
    console.log(record)

    setInput(record.text)

    // todos.forEach((todo, index) => {
    //   if(todo.key === record.key){
    //     todos[index] = {
    //       ...todo,
    //       text: input
    //     }
    //   }
    // })

    const editedTodos = todos.map(todo => {
      if(todo.key === record.key){
        return {
          ...todo,
          text: input
        }
      }
      return todo
    })

    setTodos(editedTodos)

    
  }

  const handleDelete = (record) => {
    let popKey = record.key

    console.log(`popKey: ${popKey}`)
    // todos.pop(popKey)
    // console.log(todos)
    // setTodos(prev => prev.pop(popKey))

    const updatedTodos = todos.filter(todo => todo.key !== popKey)
    
    setTodos(updatedTodos)

      // return console.log(todo.key)                
      // const result =  todo.key !== popKey         
      // console.log(`todo: ${todo.key}`)            
      // return result

    console.log(todos)
  }

  console.log(todos)


    const columns = [
      {
        key: '1',
        title: ''
      },
      {
        key: '2',
        dataIndex: 'text',
        title: 'ToDo',
        // render: (tag) => {
        //   console.log(tag)
        //   const color = tag.completed === false ? "pink" : "orchid"
        //   return <Tag color={color} key={tag}>{tag}</Tag>

        // }
      },
      {
        key: '3',
        dataIndex: 'completed',
        title: 'Status',
        render: (tag) => {
          // console.log(tag)
          const color = tag === true ? "green" : "red";
          const status = tag === true ? "Completed" : "Pending";
          return <Tag color={color} key={tag}>{status}</Tag>
        }
      },
      {
        key: '4',
        dataIndex: 'dateTime',
        title: 'Date-Time',
      },
      {
        key: '5',
        render: (record) => {
          return <EditOutlined 
            onClick={() => {
              console.log(record)
              handleCheck(record)
            }}
          />
          
        }
      },
      {
        key: '6',
        render: (record) => {
          return <CloseOutlined 
            onClick={() => {
              console.log(record)
              handleDelete(record)
            }}
          />
        }
      },
    ] 



    const handleAddTodo = (e) => {
      console.log("Clicked!")
      console.log(currentDateTime)

      setTodos(prev => [...prev, {
          key: uuidv4(),
          text: input,
          dateTime: currentDateTime,
          completed: false
      }])
      console.log(todos)
    }
    // console.log(todos)


  return (
    <div>
      <h3>ToDo List</h3>
      <div className='input-container'>
        <Input 
          className='input' 
          type='text' 
          placeholder='Enter Todo'
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            console.log(input)
          }}  
        ></Input>        
        <PlusOutlined 
          className='add-btn' 
          onClick={handleAddTodo} 
        />
        {/* <PlusSquareTwoTone className='add-btn'/> */}
      </div>

      <Table
        dataSource={todos}
        columns={columns}
        rowSelection={
          {
            type: 'checkbox',
            hideSelectAll: true,
            onChange: (key) => {
              console.log(key)
            },
            onSelect: (keySelected) => {
              console.log(keySelected)
              
              let toggledTodos = todos.map(todo => {
                if(todo.key === keySelected.key) {
                  console.log("Same key")
                  return {
                    ...todo,
                    completed: !todo.completed
                  }
                }
                return todo
              })

              setTodos(toggledTodos) 

              // setTodos(prev => {
              //   return prev.map(todo => {
              //     if(todo.key === keySelected) {
              //       return {
              //         ...todo,
              //         completed: !todo.completed
              //       }
              //     }
              //     return todo
              //   })
              // })

              // setTodos(prev => {
              //   return [
              //     {
              //       ...prev,
              //       completed: prev.key === keySelected ? !prev.completed : prev.completed 
              //     }
              //   ]
              // })

              // setTodos(prev => prev[keySelected].completed = !prev[keySelected].completed)
              // setTodos()

              // setComplete(prev => !prev)
              // console.log(complete)
              
            }
          }
        }
        
        
      >
      </Table>


    </div>
  )
}

export default Todo
