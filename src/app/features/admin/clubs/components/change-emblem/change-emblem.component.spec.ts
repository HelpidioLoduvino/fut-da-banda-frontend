import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmblemComponent } from './change-emblem.component';

describe('ChangeEmblemComponent', () => {
  let component: ChangeEmblemComponent;
  let fixture: ComponentFixture<ChangeEmblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeEmblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeEmblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
