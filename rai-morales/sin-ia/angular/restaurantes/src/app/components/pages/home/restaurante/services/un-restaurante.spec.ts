import { TestBed } from '@angular/core/testing';

import { UnRestaurante } from './un-restaurante';

describe('UnRestaurante', () => {
  let service: UnRestaurante;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnRestaurante);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
