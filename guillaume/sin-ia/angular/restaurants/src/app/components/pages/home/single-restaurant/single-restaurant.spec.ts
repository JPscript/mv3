import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRestaurant } from './single-restaurant';

describe('SingleRestaurant', () => {
  let component: SingleRestaurant;
  let fixture: ComponentFixture<SingleRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleRestaurant],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleRestaurant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
