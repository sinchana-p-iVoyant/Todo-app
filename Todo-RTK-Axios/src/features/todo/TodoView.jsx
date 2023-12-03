import React, { useEffect, useState } from 'react'
import { Input, Table, Tag } from 'antd';
import { PlusOutlined, CloseOutlined, EditOutlined, EditTwoTone, ClockCircleOutlined, ClockCircleFilled, ClockCircleTwoTone, CalendarOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid';
import { fetchTodos, postTodos } from './todoSlice'

import { addTodo, editTodo, deleteTodo, toggleTodo } from './todoSlice';
import { useSelector, useDispatch } from 'react-redux';

import './Todo.css'

const TodoView = () => {
  
  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const todos = useSelector((state) => state.todo.todos)
  // console.log(todos)

  const dispatch = useDispatch()


 // {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   },

  // const [todos, setTodos] = useState(demoTodo)
  const [input, setInput] = useState("")

  // const [currentDateTime, setCurrentDateTime] = useState()
  // const [currentDate, setCurrentDate] = useState()
  // const [currentTime, setCurrentTime] = useState()

  // useEffect(() => {
  //   let dateTime = new Date()
  //   let formattedDateTime = dateTime.toLocaleString()
  //   let [date, time] = formattedDateTime.split(',')
  //   console.log(date, time)
  //   // console.log(dateTime)
  //   setCurrentDateTime(formattedDateTime)
  //   setCurrentDate(date)
  //   setCurrentTime(time)
  // },[])

  const handleEdit = (record) => {
      console.log(record)

      setInput(record.title)

      const editedTodos = todos.map(todo => {
        if(todo.key === record.key){
          return {
            ...todo,
            title: input
          }
        }
        return todo
      })
      console.log(editedTodos)
      return editedTodos
      // setTodos(editedTodos)

    
  }

  const handleDelete = (record) => {
      let popKey = record.key
      console.log(`popKey: ${popKey}`)

      const updatedTodos = todos.filter(todo => todo.key !== popKey)
      
      // setTodos(updatedTodos)

      console.log(todos)
      return updatedTodos
  }

  // console.log(todos)


    const columns = [
      {
        key: '1',
        title: ''
      },
      {
        key: '2',
        dataIndex: 'title',
        title: 'ToDo',
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
      // {
      //   key: '4',
      //   dataIndex: 'date',
      //   title: 'Date',
      //   render: (date) => {
      //     return <Tag icon={ <CalendarOutlined /> }>{ date }</Tag>
      //   }
      // },
      // {
      //   key: '5',
      //   dataIndex: 'time',
      //   title: 'Time',
      //   render: (time) => {
      //     return <Tag icon={ <ClockCircleOutlined /> }>{ time }</Tag>
      //   }
      // },
      {
        key: '6',
        render: (record) => {
          
          return <EditTwoTone twoToneColor="#52c41a"
            color='green'
            onClick={(e) => {
              console.log(record)
              // console.log(record)
              const editedTodo = handleEdit(record)
              console.log(editedTodo)
              dispatch(editTodo(editedTodo))
              // dispatch(editTodo(record))
            }}
          />
          
        }
      },
      {
        key: '7',
        render: (record) => {
          return <CloseOutlined 
          style={{color: 'red'}}
            onClick={(e) => {
              console.log(record)
              const updatedTodo = handleDelete(record)
              dispatch(deleteTodo(updatedTodo))
            }}
          />
        }
      },
    ] 


    // const handleAddTodo = (e) => {
    //     console.log("Clicked!")
    //     // console.log(currentDateTime)

    //     setTodos(prev => [...prev, {
    //         key: uuidv4(),
    //         text: input,
    //         // dateTime: currentDateTime,
    //         completed: false
    //     }])
    //     console.log(todos)
    // }

    const handleNewTodo = (e) => {
        // console.log("Clicked!")



        // dispatch(())
        const newTodo = {
            id: uuidv4(),
            title: input,
            // dateTime: currentDateTime,
            // date: currentDate,
            // time: currentTime,
            completed: false
        }
        return newTodo

        // console.log(newTodo)
        // console.log(currentDateTime)

        // setTodos(prev => [...prev, {
        //     key: uuidv4(),
        //     text: input,
        //     dateTime: currentDateTime,
        //     completed: false
        // }])
    }

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
          onClick={(e) => {     

            const newTodo = handleNewTodo()
            dispatch(postTodos(newTodo))

            // const getNewTodo = handleNewTodo()
            // dispatch(addTodo(getNewTodo))
            
            // dispatch(addTodo())
            // console.log(todos)
            
            // const z = handleNewTodo()
            // dispatch(addTodo(handleNewTodo()))
            // onClick={handleAddTodo} 
          }}
        />
      </div>

      <Table
        dataSource={todos}
        columns={columns}
        rowSelection={
          {
            type: 'checkbox',
            hideSelectAll: true,
            // checkStrictly: true,
            // selections	: (keys) => {
            //   console.log(keys)
            // },
            // selectedRowKeys: (keys) => {
            //   console.log(keys)
            // },
            onChange: (id) => {
              console.log(id)
            },
            onSelect: (completedTodos) => {
              console.log(completedTodos)
              
              let toggledTodos = todos.map(todo => {
                if(todo.id === completedTodos.id) {
                  console.log("Same id")
                  return {
                    ...todo,
                    completed: true
                  }
                } 
                return todo
              })
              console.log(toggledTodos)
              dispatch(toggleTodo(completedTodos))
              // dispatch(toggleTodo(toggledTodos))
              // setTodos(toggledTodos)       
            }
          }
        }
        
        
      >
      </Table>


    </div>
  )
}

export default TodoView
