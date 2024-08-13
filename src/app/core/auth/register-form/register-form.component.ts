import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {passwordMatchValidator} from "./validators/passwordMatchValidator";
import {isPersonalDataValid} from "./validators/stepper-validation";
import {User} from "../../models/User";
import {Player} from "../../models/Player";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    RouterLink,
    SharedModule,
    MatStepperModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit{

  registerForm!: FormGroup
  photo!: File;
  @ViewChild(MatStepper) stepper!: MatStepper;
  errorMessage: string = '';
  role!: string | null

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user: this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        userRole: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validators: passwordMatchValidator()
      }),
      player: this.formBuilder.group({
        gender: [''],
        position: [''],
        biography: [''],
        available: ['']
      })
    });

    this.registerForm.get('user.userRole')?.valueChanges.subscribe(userRole => {
      if (userRole === 'USER') {
        this.registerForm.get('player')?.disable({ emitEvent: false });
      } else {
        this.registerForm.get('player')?.enable({ emitEvent: false });
        this.registerForm.get('player.gender')?.setValidators(Validators.required);
        this.registerForm.get('player.position')?.setValidators(Validators.required);
        this.registerForm.get('player.biography')?.setValidators(Validators.required);
        this.registerForm.get('player.available');

      }
    });

    this.registerForm.get('player')?.disable({ emitEvent: false });
  }


  onImageFileChange(event: any) {
    if(event.target.files.length > 0){
      this.photo = event.target.files[0];
    }
  }

  register() {
    if(this.registerForm.valid){
      this.errorMessage = '';

      const userForm = this.registerForm.get('user')?.value;
      const playerForm = this.registerForm.get('player')?.value;
      const userRole = userForm.userRole;

      let user: User = {
        fullName: userForm.fullName,
        email: userForm.email,
        password: userForm.password,
        userRole: userRole
      };

      if(userRole === 'USER'){
        this.userService.registerUser(user).subscribe(response=>{
          if(response.ok){
            this.isAdmin()
          } else {
            this.snackBar.open('Erro ao Fazer Registo!', 'Fechar', {
              duration: 1000, panelClass: ['snackbar-error']
            });
          }
        })
      } else {
        let player: Player = {
          ...user,
          gender: playerForm.gender,
          position: playerForm.position,
          biography: playerForm.biography,
          available: playerForm.available
        }

        this.userService.registerPlayer(player, this.photo).subscribe(response=>{
          if(response.ok){
            this.isAdmin()
          } else {
            this.snackBar.open('Erro ao Fazer Registo!', 'Fechar', {
              duration: 1000, panelClass: ['snackbar-error']
            });
          }
        })
      }
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

  isAdmin(){
    this.userService.findRole().subscribe(response=>{
      if(response.ok){
        this.role = response.body
        if(this.role === "ADMIN"){
          this.snackBar.open('Registo Feito Com Sucesso', 'Fechar', {
            duration: 1000, panelClass: ['snackbar-success']
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.router.navigate(['/entrar']).then(r => {
            this.snackBar.open('Registo Feito Com Sucesso', 'Fechar', {
              duration: 1000, panelClass: ['snackbar-success']
            });
          })
        }
      } else {
        console.log("Erro na requisição:", Error);
        this.snackBar.open('Erro ao comunicar com o servidor.', 'Fechar', {
          duration: 1000, panelClass: ['snackbar-error']
        });
      }
    })
  }

}
