import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePayerComponent } from './available-payer.component';

describe('AvailablePayerComponent', () => {
  let component: AvailablePayerComponent;
  let fixture: ComponentFixture<AvailablePayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailablePayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailablePayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
