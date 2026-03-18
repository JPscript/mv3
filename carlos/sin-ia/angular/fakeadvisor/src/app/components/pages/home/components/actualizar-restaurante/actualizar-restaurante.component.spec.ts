import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRestauranteComponent } from './actualizar-restaurante.component';

describe('ActualizarRestauranteComponent', () => {
  let component: ActualizarRestauranteComponent;
  let fixture: ComponentFixture<ActualizarRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRestauranteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
