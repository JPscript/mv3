import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarRestaurante } from './borrar-restaurante';

describe('BorrarRestaurante', () => {
  let component: BorrarRestaurante;
  let fixture: ComponentFixture<BorrarRestaurante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarRestaurante],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrarRestaurante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
