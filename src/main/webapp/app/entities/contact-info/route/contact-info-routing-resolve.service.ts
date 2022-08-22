import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContactInfo } from '../contact-info.model';
import { ContactInfoService } from '../service/contact-info.service';

@Injectable({ providedIn: 'root' })
export class ContactInfoRoutingResolveService implements Resolve<IContactInfo | null> {
  constructor(protected service: ContactInfoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContactInfo | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((contactInfo: HttpResponse<IContactInfo>) => {
          if (contactInfo.body) {
            return of(contactInfo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
