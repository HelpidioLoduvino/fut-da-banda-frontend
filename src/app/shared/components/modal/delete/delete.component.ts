import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  private id!: number

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.componentData.id;
  }

  delete(){

  }

}
