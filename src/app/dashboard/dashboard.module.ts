import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; 
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PlotEntryComponent } from './plot-entry/plot-entry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
    PlotEntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireDatabaseModule
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
