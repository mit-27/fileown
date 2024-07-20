"use client"

import { trpc } from '@/server/client'
import React, { useState } from 'react'
trpc

const TodoPage = () => {

    const todos = trpc.getTodos.useQuery();
    const addTodo = trpc.addTodo.useMutation({
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