import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipDetailComponent } from './championship-detail.component';

describe('ChampionshipDetailComponent', () => {
  let component: ChampionshipDetailComponent;
  let fixture: ComponentFixture<ChampionshipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionshipDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionshipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
