import { TestBed, inject } from '@angular/core/testing';

import { MshttpService } from './mshttp.service';

describe('MshttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MshttpService]
    });
  });

  it('should be created', inject([MshttpService], (service: MshttpService) => {
    expect(service).toBeTruthy();
  }));
});
