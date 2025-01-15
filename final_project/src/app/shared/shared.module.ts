// shared.module.ts



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
  ],
  exports:[
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,


    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ]
})
export class SharedModule { }
