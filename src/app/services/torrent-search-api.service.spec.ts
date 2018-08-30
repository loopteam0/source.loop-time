import { TestBed, inject } from '@angular/core/testing';

import { TorrentSearchApiService } from './torrent-search-api.service';

describe('TorrentSearchApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TorrentSearchApiService]
    });
  });

  it('should be created', inject([TorrentSearchApiService], (service: TorrentSearchApiService) => {
    expect(service).toBeTruthy();
  }));
});
