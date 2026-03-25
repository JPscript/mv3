import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantesListaComponent } from './restaurantes-lista.component';

describe('RestaurantesListaComponent', () => {
  let component: RestaurantesListaComponent;
  let fixture: ComponentFixture<RestaurantesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantesListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
