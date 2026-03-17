import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRestaurante } from './crear-restaurante';

describe('CrearRestaurante', () => {
  let component: CrearRestaurante;
  let fixture: ComponentFixture<CrearRestaurante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRestaurante],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearRestaurante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
