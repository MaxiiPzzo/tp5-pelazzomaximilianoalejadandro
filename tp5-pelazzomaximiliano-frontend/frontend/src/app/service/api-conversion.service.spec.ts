import { TestBed } from '@angular/core/testing';

import { ApiConversionService } from './api-conversion.service';

describe('ApiConversionService', () => {
  let service: ApiConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
