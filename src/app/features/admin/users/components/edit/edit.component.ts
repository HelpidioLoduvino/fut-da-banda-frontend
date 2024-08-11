import {Component, Inject, OnInit} from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../../../core/models/User";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../../../core/services/user.service";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  userForm!: FormGroup
  public user!: User
  private id!: number

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
    this.id = data.componentData.id;
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullName: [''],
      email: ['']
    })
    this.details()
  }

  details(){
    this.userService.findById(this.id).subscribe(response=>{
      if(response.ok){
        this.user = response.body as User
        this.userForm.patchValue({
          fullName: this.user.fullName,
          email: this.user.email
        })
      }
    })
  }

  update(){
    if(this.userForm.valid){
      const user = this.userForm.value
      this.userService.update(user, this.id).subscribe(response=>{
        if(response.ok){
          this.snackBar.open("Campo atualizado com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else{
          this.snackBar.open("Erro ao atualizar campo", 'Fechar', {
            duration: 1000
          })
        }
      })
    }
  }

}
