import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChampionshipComponent } from './admin-championship.component';

describe('AdminChampionshipComponent', () => {
  let component: AdminChampionshipComponent;
  let fixture: ComponentFixture<AdminChampionshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminChampionshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
