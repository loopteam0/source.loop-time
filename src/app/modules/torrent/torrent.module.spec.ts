import { TorrentModule } from './torrent.module';

describe('TorrentModule', () => {
  let torrentModule: TorrentModule;

  beforeEach(() => {
    torrentModule = new TorrentModule();
  });

  it('should create an instance', () => {
    expect(torrentModule).toBeTruthy();
  });
});
