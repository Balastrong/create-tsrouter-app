import { z } from 'zod'

import type { TRPCRouterRecord } from '@trpc/server'

import { createTRPCRouter, publicProcedure } from './init'

const todos = [
  { id: 1, name: 'Get groceries' },
  { id: 2, name: 'Buy a new phone' },
  { id: 3, name: 'Finish the project' },
]

const todosRouter = {
  list: publicProcedure.query(async () => todos),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const newTodo = { id: todos.length + 1, name: input.name }
      todos.push(newTodo)
      return newTodo
    }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  todos: todosRouter,
})
export type TRPCRouter = typeof trpcRouter
