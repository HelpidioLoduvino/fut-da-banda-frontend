import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGameDetailComponent } from './admin-game-detail.component';

describe('AdminGameDetailComponent', () => {
  let component: AdminGameDetailComponent;
  let fixture: ComponentFixture<AdminGameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGameDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
