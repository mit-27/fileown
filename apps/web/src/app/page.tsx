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
    <div className='flex justify-center items-center min-h-full'>
      <div>
        {JSON.stringify(todos?.data)}
      </div>
      <div>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={() => {
          addTodo.mutate(todo);
        }}>Add</button>
      </div>
    </div>
  )
}

export default TodoPage