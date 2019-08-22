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
import { MatExpansionModule } from '@angular/material/expansion';
import { DebitEntryComponent } from './debit-entry/debit-entry.component';
import { MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    PlotEntryComponent,
    DebitEntryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireDatabaseModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
