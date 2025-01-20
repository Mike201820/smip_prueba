import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitudComponent } from './modal-solicitud.component';

describe('ModalSolicitudComponent', () => {
  let component: ModalSolicitudComponent;
  let fixture: ComponentFixture<ModalSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSolicitudComponent]
    });
    fixture = TestBed.createComponent(ModalSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
