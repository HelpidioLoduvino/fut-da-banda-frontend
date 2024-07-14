import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../icons/icons.module";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    IconsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(){
    if(this.loginForm.valid){
      const credentials = this.loginForm.value;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.userService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('email', response.email);
          localStorage.setItem('id', response.id);
          localStorage.setItem('userRole', response.userRole);
          if(response.userRole === "ADMIN"){
            this.router.navigate(['/admin']).then();
          } else if (response.userRole === "CAPTAIN" || response.userRole === "PLAYER" || response.userRole === "COACH"){
            this.router.navigate(['']).then();
          }
        },
        error: (error) => {
          this.snackBar.open('Erro ao Iniciar Sessão!', 'Fechar', {
            duration: 3000, panelClass: ['snackbar-error']
          });
        }
      })
    } else {
      this.snackBar.open('Formulário Inválido!', 'Fechar', {
        duration: 3000, panelClass: ['snackbar-error']
      });
      console.error("Formulario invalido")
    }
  }

}
