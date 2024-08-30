import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedModule} from "../../../shared/shared.module";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    SharedModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  isLoading = false;

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

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = this.loginForm.value;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.userService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          if(response.status !== "Bloqueado"){
            if (response.userRole === "ADMIN") {
              this.router.navigate(['/dashboard']).then();
            } else if (response.userRole === "PLAYER" || response.userRole === "USER") {
              this.router.navigate(['']).then();
            }
          } else {
            this.snackBar.open('Conta bloqueada pelo Administrador', 'Fechar', {
              duration: 1000, panelClass: ['snackbar-error']
            });
          }
        },
        error: (error) => {
          this.snackBar.open('Erro ao Iniciar Sessão!', 'Fechar', {
            duration: 1000, panelClass: ['snackbar-error']
          });
          console.log(error)
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      return;
    }
  }

}
