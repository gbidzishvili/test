import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { imageResolverResolver } from './image-resolver.resolver';

describe('imageResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => imageResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
