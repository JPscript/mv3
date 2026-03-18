import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrescarMapaComponent } from './refrescar-mapa.component';

describe('RefrescarMapaComponent', () => {
  let component: RefrescarMapaComponent;
  let fixture: ComponentFixture<RefrescarMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefrescarMapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefrescarMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
