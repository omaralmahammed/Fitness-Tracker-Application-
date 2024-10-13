import { TestBed } from '@angular/core/testing';

import { QusaiURLService } from './qusai-url.service';

describe('QusaiURLService', () => {
  let service: QusaiURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QusaiURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
