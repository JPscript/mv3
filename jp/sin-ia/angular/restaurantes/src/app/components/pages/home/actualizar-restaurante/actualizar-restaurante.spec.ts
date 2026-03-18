import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRestaurante } from './actualizar-restaurante';

describe('ActualizarRestaurante', () => {
  let component: ActualizarRestaurante;
  let fixture: ComponentFixture<ActualizarRestaurante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRestaurante],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizarRestaurante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
