import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { AdminGuard } from './adminGuard';

describe('adminGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => AdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
