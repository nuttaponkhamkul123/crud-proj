import { TestBed } from '@angular/core/testing';

import { ParcelCrudService } from './parcel-crud.service';

describe('ParcelCrudService', () => {
  let service: ParcelCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
