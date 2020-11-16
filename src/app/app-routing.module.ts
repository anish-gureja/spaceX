import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpaceLaunchComponent } from './components/space-launch/space-launch.component';


const routes: Routes = [{path:'',redirectTo:'spaceX',pathMatch:'full'},{path:'spaceX',component:SpaceLaunchComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
