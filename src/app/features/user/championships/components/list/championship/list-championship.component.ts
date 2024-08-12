import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../../../../shared/components/navbar/navbar.component";
import {FooterComponent} from "../../../../../../shared/components/footer/footer.component";
import {SharedModule} from "../../../../../../shared/shared.module";

@Component({
  selector: 'app-championship',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './list-championship.component.html',
  styleUrl: './list-championship.component.css'
})
export class ListChampionshipComponent implements OnInit{

  championships: any[] = []

  ngOnInit(): void {
  }

}
