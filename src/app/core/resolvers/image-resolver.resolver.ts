import { ResolveFn } from '@angular/router';

export const imageResolverResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
