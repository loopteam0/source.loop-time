import { TestBed } from '@angular/core/testing';

import { ElectronStorageService } from './electron-storage.service';

describe('ElectronStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectronStorageService = TestBed.get(ElectronStorageService);
    expect(service).toBeTruthy();
  });
});
