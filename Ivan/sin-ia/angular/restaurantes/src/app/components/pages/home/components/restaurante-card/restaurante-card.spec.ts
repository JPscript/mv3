import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteCard } from './restaurante-card';

describe('RestauranteCard', () => {
  let component: RestauranteCard;
  let fixture: ComponentFixture<RestauranteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauranteCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RestauranteCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
