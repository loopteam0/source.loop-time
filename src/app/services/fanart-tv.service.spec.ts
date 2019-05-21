import { TestBed, inject } from '@angular/core/testing';

import { FanartTvService } from './fanart-tv.service';

describe('TraktTvApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FanartTvService]
    });
  });

  it('should be created', inject([FanartTvService], (service: FanartTvService) => {
    expect(service).toBeTruthy();
  }));
});
