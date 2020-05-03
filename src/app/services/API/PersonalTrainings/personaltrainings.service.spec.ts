import { TestBed } from '@angular/core/testing';

import { PersonaltrainingsService } from './personaltrainings.service';

describe('PersonaltrainingsService', () => {
  let service: PersonaltrainingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaltrainingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
