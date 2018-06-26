import { TestBed, inject } from '@angular/core/testing';

import { VesselRouteService } from './vessel-route.service';

describe('VesselRouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VesselRouteService]
    });
  });

  it('should be created', inject([VesselRouteService], (service: VesselRouteService) => {
    expect(service).toBeTruthy();
  }));
});
