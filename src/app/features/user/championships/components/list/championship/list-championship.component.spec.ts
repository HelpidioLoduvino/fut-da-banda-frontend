import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChampionshipComponent } from './list-championship.component';

describe('ChampionshipComponent', () => {
  let component: ListChampionshipComponent;
  let fixture: ComponentFixture<ListChampionshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListChampionshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
