import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerStatComponent } from './admin-player-stat.component';

describe('AdminPlayerStatComponent', () => {
  let component: AdminPlayerStatComponent;
  let fixture: ComponentFixture<AdminPlayerStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPlayerStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlayerStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
