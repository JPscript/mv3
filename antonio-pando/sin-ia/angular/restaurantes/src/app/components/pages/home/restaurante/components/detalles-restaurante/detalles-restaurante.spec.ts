import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesRestaurante } from './detalles-restaurante';

describe('DetallesRestaurante', () => {
  let component: DetallesRestaurante;
  let fixture: ComponentFixture<DetallesRestaurante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesRestaurante],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesRestaurante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
