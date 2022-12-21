import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Task } from "@app/modules/tasks/interfaces/task.interface";
import { Observable } from "rxjs";
import { map, startWith, switchMap } from "rxjs/operators";
import { TaskService } from "../../services/task.api.service";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  form: FormGroup = new FormGroup({
    filter: new FormControl(""),
  });

  tasks$: Observable<Array<Task>> = this.form.valueChanges.pipe(
    startWith({ filter: "" }),
    switchMap((value) => {
      return this.service.tasks$.pipe(
        map((el) => {
          return el.filter((task) => {
            return (
              task.label.toLowerCase().includes(value.filter.toLowerCase()) ||
              task.category
                .toLowerCase()
                .includes(value.filter.toLowerCase()) ||
              task.description
                .toLowerCase()
                .includes(value.filter.toLowerCase())
            );
          });
        })
      );
    })
  );

  constructor(private service: TaskService) {}

  ngOnInit(): void {}

  isDone(task: Task): boolean {
    return !!task.done;
  }
  markAsDone(event: any, task: Task): void {
    this.service
      .updateTask({ ...task, done: event.target.checked })
      .subscribe();
  }
}
