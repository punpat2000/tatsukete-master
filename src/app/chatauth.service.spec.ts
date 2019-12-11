import { TestBed } from '@angular/core/testing';

import { AuthService } from './chatauth.service';

describe('ChatauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
