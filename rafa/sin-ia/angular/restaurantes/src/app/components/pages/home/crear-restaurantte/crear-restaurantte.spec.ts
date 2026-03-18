import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRestaurantte } from './crear-restaurantte';

describe('CrearRestaurantte', () => {
  let component: CrearRestaurantte;
  let fixture: ComponentFixture<CrearRestaurantte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRestaurantte],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearRestaurantte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
