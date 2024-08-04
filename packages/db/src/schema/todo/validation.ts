import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

import { todo } from "./todo";

export const insertTodoSchema = createInsertSchema(todo);

export const selectTodoSchema = createSelectSchema(todo);

export type InsertTodo = z.infer<typeof insertTodoSchema>;
export type Todo = z.infer<typeof selectTodoSchema>;
