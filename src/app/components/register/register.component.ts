import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatLabel
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup
  photo!: File;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      userRole: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      position: ['', Validators.required],
      gender: ['', Validators.required],
      biography: ['', Validators.required],
    });
  }

  onImageFileChange(event: any) {
    if(event.target.files.length > 0){
      this.photo = event.target.files[0];
    }
  }

  register() {
    if(this.registerForm.valid){
      const player = this.registerForm.value;
      this.userService.registerPlayer(player, this.photo).subscribe(response=>{
        if(response.ok){
          this.snackBar.open('Registo Feito Com Sucesso', 'Fechar', {
            duration: 3000, panelClass: ['snackbar-success']
          });
          this.router.navigate(['/entrar']).then(r => {})
        } else {
          this.snackBar.open('Erro ao Fazer Registo!', 'Fechar', {
            duration: 3000, panelClass: ['snackbar-error']
          });
        }
      })
    }else{
      this.snackBar.open('Formulário Inválido!', 'Fechar', {
        duration: 3000, panelClass: ['snackbar-error']
      });
    }
  }


}
