import { TestBed } from '@angular/core/testing';

import { LoginserviseService } from './loginservise.service';

describe('LoginserviseService', () => {
  let service: LoginserviseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginserviseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
