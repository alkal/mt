import { TestBed, inject } from '@angular/core/testing';

import { VesselApiCallService } from './vessel-api-call.service';

describe('VesselApiCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VesselApiCallService]
    });
  });

  it('should be created', inject([VesselApiCallService], (service: VesselApiCallService) => {
    expect(service).toBeTruthy();
  }));
});
