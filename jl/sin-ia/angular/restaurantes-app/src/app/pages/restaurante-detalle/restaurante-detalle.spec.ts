import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteDetalle } from './restaurante-detalle';

describe('RestauranteDetalle', () => {
  let component: RestauranteDetalle;
  let fixture: ComponentFixture<RestauranteDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauranteDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(RestauranteDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
