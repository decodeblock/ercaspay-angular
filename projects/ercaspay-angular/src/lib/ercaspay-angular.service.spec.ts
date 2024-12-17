import { TestBed } from '@angular/core/testing';

import { ErcaspayAngularService } from './ercaspay-angular.service';

describe('ErcaspayAngularService', () => {
  let service: ErcaspayAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErcaspayAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
