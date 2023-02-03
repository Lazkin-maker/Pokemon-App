import { TestBed } from '@angular/core/testing';

import { CollectedPokeService } from './collected-poke.service';

describe('CollectedPokeService', () => {
  let service: CollectedPokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectedPokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
