import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvitationComponent } from './admin-invitation.component';

describe('AdminInvitationsComponent', () => {
  let component: AdminInvitationComponent;
  let fixture: ComponentFixture<AdminInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInvitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
