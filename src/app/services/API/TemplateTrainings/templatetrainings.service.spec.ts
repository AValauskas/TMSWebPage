import { TestBed } from '@angular/core/testing';

import { TemplatetrainingsService } from './templatetrainings.service';

describe('TemplatetrainingsService', () => {
  let service: TemplatetrainingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatetrainingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
