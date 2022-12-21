import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { TaskService } from "../../services/task.api.service";

@Component({
  selector: "app-task-edit",
  templateUrl: "./task-edit.component.html",
  styleUrls: ["./task-edit.component.scss"],
})
export class TaskEditComponent implements OnInit {
  form: FormGroup = new FormGroup({
    label: new FormControl(""),
    description: new FormControl(""),
    category: new FormControl(""),
  });

  isCreateMode: boolean = true;
  id: number;

  constructor(
    private service: TaskService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(
        map((params) => {
          return params.id;
        }),
        tap((id) => {
          this.isCreateMode = !id;
          this.id = id;
        }),
        switchMap((id) => {
          if (id) {
            return this.service.getTask(id);
          }
          return of(null);
        }),
        filter((value) => value !== null),
        tap((task) => {
          this.form.setValue({
            label: task.label,
            description: task.description,
            category: task.category,
          });
        })
      )
      .subscribe();
  }

  submit() {
    const data = this.form.getRawValue();

    if (this.isCreateMode) {
      data.done = false;
      this.service
        .createTask(data)
        .pipe(tap(() => this.navigate()))
        .subscribe();
    } else {
      data.id = this.id;
      this.service
        .updateTask(data)
        .pipe(tap(() => this.navigate()))
        .subscribe();
    }
  }

  get buttonText() {
    return this.isCreateMode ? "Create" : "Update";
  }

  navigate() {
    this.router.navigate(["/tasks"]);
  }
}
