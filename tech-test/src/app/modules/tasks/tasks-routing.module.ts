import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TaskDetailsComponent } from "./components/task-details/task-details.component";
import { TaskEditComponent } from "./components/task-edit/task-edit.component";
import { TaskListComponent } from "./components/task-list/task-list.component";

const routes: Routes = [
  {
    path: "",
    component: TaskListComponent,
  },
  {
    path: ":id/edit",
    component: TaskEditComponent,
  },
  {
    path: "create",
    component: TaskEditComponent,
  },
  {
    path: ":id",
    component: TaskDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
