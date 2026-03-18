import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRestaurant } from './delete-restaurant';

describe('DeleteRestaurant', () => {
  let component: DeleteRestaurant;
  let fixture: ComponentFixture<DeleteRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRestaurant],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteRestaurant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
