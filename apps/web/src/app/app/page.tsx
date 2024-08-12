"use client"

import { api } from '@/trpc/client'
import React, { useState } from 'react'

const TodoPage = () => {

    const todos = api.todo.getTodos.useQuery();
    const addTodo = api.todo.addTodo.useMutation({
      onSettled: () => {
        todos.refetch();
      }
    });
    const [todo,setTodo] = useState<string>('')

  return (
    <div className='flex justify-center items-center h-screen flex-col gap-2'>
      <div>
        {JSON.stringify(todos?.data)}
      </div>
      <div>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        
      </div>
      <button onClick={() => {
          addTodo.mutate(todo);
        }}>Add</button>
    </div>
  )
}

export default TodoPage