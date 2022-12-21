import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "tasks",
    loadChildren: () =>
      import("./modules/tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "**",
    redirectTo: "tasks",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
