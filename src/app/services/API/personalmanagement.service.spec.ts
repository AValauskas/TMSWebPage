import { TestBed } from '@angular/core/testing';

import { PersonalmanagementService } from './personalmanagement.service';

describe('PersonalmanagementService', () => {
  let service: PersonalmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
