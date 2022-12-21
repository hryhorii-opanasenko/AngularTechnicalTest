import { Injectable, Injector } from "@angular/core";
import { ApiService } from "@app/classes/api.service";
import { Task } from "@app/modules/tasks/interfaces/task.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: "any",
})
export class TaskService extends ApiService {
  private _tasks: BehaviorSubject<Array<Task>> = new BehaviorSubject<
    Array<Task>
  >([]);
  public tasks$: Observable<Array<Task>> = this._tasks.asObservable();

  constructor(injector: Injector) {
    super(injector);
    this.getTasks().subscribe();
  }

  getTasks(): Observable<Array<Task>> {
    return this.get<Array<Task>>("tasks").pipe(
      tap((tasks) => {
        this._tasks.next(tasks);
      })
    );
  }

  getTask(id: number) {
    return this.get<Task>(`tasks/${id}`);
  }

  createTask(data: Omit<Task, "id">) {
    return this.getTasks().pipe(
      map((tasks) => {
        try {
          const nextId = tasks.sort((a, b) => b.id - a.id)[0].id + 1;
          return nextId;
        } catch (error) {
          return 1;
        }
      }),
      switchMap((nextId) => {
        return this.post<Task>("tasks", { ...data, id: nextId });
      }),
      switchMap(() => this.getTasks())
    );
  }

  updateTask(data: Task) {
    return this.patch(`tasks/${data.id}`, data).pipe(
      switchMap(() => {
        return this.getTasks();
      })
    );
  }

  deleteTask(id: number) {
    return this.delete(`tasks/${id}`).pipe(
      switchMap(() => {
        return this.getTasks();
      })
    );
  }
}
