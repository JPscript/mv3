import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarRestauranteComponent } from './borrar-restaurante.component';

describe('BorrarRestauranteComponent', () => {
  let component: BorrarRestauranteComponent;
  let fixture: ComponentFixture<BorrarRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarRestauranteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrarRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
