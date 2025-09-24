import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Todo, TodoStatus } from "@/types";
import { CheckCircle, Circle, Hourglass } from "lucide-react";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const stats = todos.reduce(
    (acc, todo) => {
      acc[todo.status] += 1;
      return acc;
    },
    { todo: 0, "in-progress": 0, done: 0 } as Record<TodoStatus, number>
  );

  const totalTasks = todos.length;
  const completedPercentage = totalTasks > 0 ? Math.round((stats.done / totalTasks) * 100) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <div className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTasks}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">To Do</CardTitle>
          <Circle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todo}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <Hourglass className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats["in-progress"]}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.done}</div>
          <p className="text-xs text-muted-foreground">
            {completedPercentage}% completion
          </p>
        </CardContent>
      </Card>
    </div>
  );
}