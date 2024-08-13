import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChampionshipDetailComponent } from './user-championship-detail.component';

describe('DetailComponent', () => {
  let component: UserChampionshipDetailComponent;
  let fixture: ComponentFixture<UserChampionshipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserChampionshipDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserChampionshipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
