import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskDetailsComponent } from "./components/task-details/task-details.component";
import { TasksRoutingModule } from "./tasks-routing.module";
import { TaskService } from "./services/task.api.service";
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [TaskListComponent, TaskDetailsComponent, TaskEditComponent],
  imports: [CommonModule, TasksRoutingModule,ReactiveFormsModule],
  providers: [TaskService],
})
export class TasksModule {}
