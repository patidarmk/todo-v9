"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit, CheckCircle, Circle, ArrowUp, ArrowRight, ArrowDown, Hourglass } from "lucide-react";
import { Todo, TodoPriority, TodoStatus } from "@/types";
import { initialTodos } from "@/data/todos";
import { AddTodoDialog } from "./AddTodoDialog";
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusIcons: Record<TodoStatus, React.ReactElement> = {
  todo: <Circle className="h-4 w-4 text-muted-foreground" />,
  "in-progress": <Hourglass className="h-4 w-4 text-blue-500" />,
  done: <CheckCircle className="h-4 w-4 text-green-500" />,
};

const priorityIcons: Record<TodoPriority, React.ReactElement> = {
  low: <ArrowDown className="h-4 w-4 text-green-500" />,
  medium: <ArrowRight className="h-4 w-4 text-yellow-500" />,
  high: <ArrowUp className="h-4 w-4 text-red-500" />,
};

const priorityLabels: Record<TodoPriority, string> = { low: "Low", medium: "Medium", high: "High" };
const statusLabels: Record<TodoStatus, string> = { todo: "To Do", "in-progress": "In Progress", done: "Done" };

export function TodoDataTable() {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);
  const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);

  const addTodo = (todo: Omit<Todo, "id" | "createdAt">) => {
    const newTodo: Todo = {
      ...todo,
      id: `TASK-${Date.now()}`,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const updateTodoStatus = (id: string, status: TodoStatus) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, status } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getStatusBadgeVariant = (status: TodoStatus) => {
    switch (status) {
      case "todo": return "secondary";
      case "in-progress": return "default";
      case "done": return "outline";
      default: return "secondary";
    }
  };

  const getPriorityBadgeVariant = (priority: TodoPriority) => {
    switch (priority) {
      case "low": return "secondary";
      case "medium": return "default";
      case "high": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
          <p className="text-muted-foreground">
            Manage your tasks efficiently
          </p>
        </div>
        <AddTodoDialog onAddTodo={addTodo} />
      </div>
      
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[120px]">Priority</TableHead>
              <TableHead className="w-[150px]">Created</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id} className={cn(todo.status === "done" && "opacity-75")}>
                <TableCell>
                  <div className="flex items-center">
                    {statusIcons[todo.status]}
                  </div>
                </TableCell>
                <TableCell className={cn(todo.status === "done" && "line-through")}>
                  <div className="font-medium">{todo.title}</div>
                  {todo.description && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {todo.description}
                    </div>
                  )}
                  <div className="mt-2">
                    <Badge variant={getStatusBadgeVariant(todo.status)}>
                      {statusLabels[todo.status]}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {priorityIcons[todo.priority]}
                    <span className="ml-2">{priorityLabels[todo.priority]}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => updateTodoStatus(todo.id, "todo")}
                        className="flex items-center"
                      >
                        <Circle className="mr-2 h-4 w-4" />
                        Mark as Todo
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateTodoStatus(todo.id, "in-progress")}
                        className="flex items-center"
                      >
                        <Hourglass className="mr-2 h-4 w-4" />
                        Mark as In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateTodoStatus(todo.id, "done")}
                        className="flex items-center"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Done
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteTodo(todo.id)}
                        className="flex items-center text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}