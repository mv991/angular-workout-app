import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    // Add other Angular Material modules here
  ]
})
export class MaterialModule { }