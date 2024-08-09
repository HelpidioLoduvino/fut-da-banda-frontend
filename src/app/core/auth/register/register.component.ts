import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {SharedModule} from "../../../shared/shared.module";
import {passwordMatchValidator} from "./validators/passwordMatchValidator";
import {isPersonalDataValid} from "./validators/stepper-validation";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    SharedModule,
    MatStepperModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup
  photo!: File;
  @ViewChild(MatStepper) stepper!: MatStepper;
  errorMessage: string = '';

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
      password: ['', [Validators.required, Validators.minLength(6)]],
      userRole: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      position: ['', Validators.required],
      gender: ['', Validators.required],
      biography: [''],
    }, {
      validator: passwordMatchValidator()
    });
  }

  onImageFileChange(event: any) {
    if(event.target.files.length > 0){
      this.photo = event.target.files[0];
    }
  }

  register() {
    if(this.registerForm.valid){
      this.errorMessage = '';
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
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      return;
    }
  }

  isPersonalDataValid(): boolean {
    return isPersonalDataValid(this.registerForm);
  }

  onStepChange(event: any) {
    const stepIndex = event.selectedIndex;
    if (stepIndex === 1 && !this.isPersonalDataValid()) {
      this.stepper.selectedIndex = 0;
    }
  }


}
