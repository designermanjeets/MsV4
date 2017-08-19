import { TestBed, inject } from '@angular/core/testing';

import { InterceptedHttp } from './mshttp.service';

describe('MshttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterceptedHttp]
    });
  });

  it('should be created', inject([InterceptedHttp], (service: InterceptedHttp) => {
    expect(service).toBeTruthy();
  }));
});
