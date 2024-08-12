import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClubDetailComponent } from './user-club-detail.component';

describe('ClubComponent', () => {
  let component: UserClubDetailComponent;
  let fixture: ComponentFixture<UserClubDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserClubDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserClubDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
