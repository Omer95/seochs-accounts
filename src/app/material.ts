import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core'; 

@NgModule({
    imports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule
    ],
    exports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule
    ],
    providers: [
        MatDatepickerModule
    ]
})
export class MaterialModule {} 