import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChampionshipService} from "../../../../../core/services/championship.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedModule} from "../../../../../shared/shared.module";

@Component({
  selector: 'app-save',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './save.component.html',
  styleUrl: './save.component.css'
})
export class SaveComponent implements OnInit{

  championshipForm!: FormGroup
  isLoading = false
  selectedOption: string = '';
  selectedRule: string = '';

  constructor(private championshipService: ChampionshipService,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.championshipForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      province: ['', Validators.required],
      price: ['', Validators.required],
      pricePer: ['', Validators.required],
      type: ['', Validators.required],
      rule: ['', Validators.required],
      manualRule: [''],
      gender: ['', Validators.required],
      expiryDate:  ['', Validators.required],
      startDate:  ['', Validators.required],
      matchDay: ['', Validators.required]
    })
  }

  onOptionSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = selectElement.value;
  }

  onRuleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRule = selectElement.value;
  }

  submit(){
    if(this.championshipForm.valid){
      this.isLoading = true
      const championship = this.championshipForm.value
      this.championshipService.create(championship).subscribe(response=>{
        if(response.ok){
          this.isLoading = false
          this.snackbar.open("Campeonato criado com sucesso!", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.isLoading = false
          this.snackbar.open("Erro ao criar campeonato!", 'Fechar', {
            duration: 1000
          })
        }
      })
    } else {
      this.isLoading = false
      this.snackbar.open("Formulário Inválido", 'Fechar', {
        duration: 3000
      })
    }
  }

}
