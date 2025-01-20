import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPersonasComponent } from './asignar-personas.component';

describe('AsignarPersonasComponent', () => {
  let component: AsignarPersonasComponent;
  let fixture: ComponentFixture<AsignarPersonasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarPersonasComponent]
    });
    fixture = TestBed.createComponent(AsignarPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
