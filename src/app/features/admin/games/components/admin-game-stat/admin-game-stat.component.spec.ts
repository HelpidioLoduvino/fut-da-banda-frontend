import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGameStatComponent } from './admin-game-stat.component';

describe('AdminGameStatComponent', () => {
  let component: AdminGameStatComponent;
  let fixture: ComponentFixture<AdminGameStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGameStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGameStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
