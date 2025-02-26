import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userExistGuard } from './user-exist.guard';

describe('userExistGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userExistGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
