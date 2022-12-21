import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Task } from "@app/modules/tasks/interfaces/task.interface";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { TaskService } from "../../services/task.api.service";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.scss"],
})
export class TaskDetailsComponent implements OnInit {
  task$: Observable<Task> = this.activatedRouter.params.pipe(
    switchMap((params) => {
      const id = params.id;
      if (!id) {
        this.router.navigate(["/tasks"]);
      }
      return this.service.getTask(id);
    }),
    catchError(() => {
      this.router.navigate(["/tasks"]);
      return of(null);
    })
  );

  constructor(
    private service: TaskService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  deleteTask(task: Task): void {
    this.service.deleteTask(task.id).subscribe(() => {
      this.router.navigate(["/tasks"]);
    });
  }

  editTask(task: Task): void {
    this.router.navigate(["/tasks", task.id, "edit"]);
  }
}
