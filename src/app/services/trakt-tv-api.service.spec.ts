import { TestBed, inject } from '@angular/core/testing';

import { TraktTvApiService } from './trakt-tv-api.service';

describe('TraktTvApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TraktTvApiService]
    });
  });

  it('should be created', inject([TraktTvApiService], (service: TraktTvApiService) => {
    expect(service).toBeTruthy();
  }));
});
