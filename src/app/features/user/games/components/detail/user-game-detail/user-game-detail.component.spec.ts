import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGameDetailComponent } from './user-game-detail.component';

describe('UserGameDetailComponent', () => {
  let component: UserGameDetailComponent;
  let fixture: ComponentFixture<UserGameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGameDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
