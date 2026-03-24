import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioCard } from './comentario-card';

describe('ComentarioCard', () => {
  let component: ComentarioCard;
  let fixture: ComponentFixture<ComentarioCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ComentarioCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
