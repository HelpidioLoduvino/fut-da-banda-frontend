import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipComponent } from './championship.component';

describe('AdminChampionshipComponent', () => {
  let component: ChampionshipComponent;
  let fixture: ComponentFixture<ChampionshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
