import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerComponent } from './admin-player.component';

describe('AdminPlayerComponent', () => {
  let component: AdminPlayerComponent;
  let fixture: ComponentFixture<AdminPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
