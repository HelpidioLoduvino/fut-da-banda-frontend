import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotificationComponent } from './list-notification.component';

describe('ListNotificationComponent', () => {
  let component: ListNotificationComponent;
  let fixture: ComponentFixture<ListNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
