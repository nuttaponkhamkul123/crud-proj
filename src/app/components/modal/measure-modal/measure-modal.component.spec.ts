import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureModalComponent } from './measure-modal.component';

describe('ModalComponent', () => {
  let component: MeasureModalComponent;
  let fixture: ComponentFixture<MeasureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
