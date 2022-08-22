import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPersonAnnex } from '../person-annex.model';
import { PersonAnnexService } from '../service/person-annex.service';

@Injectable({ providedIn: 'root' })
export class PersonAnnexRoutingResolveService implements Resolve<IPersonAnnex | null> {
  constructor(protected service: PersonAnnexService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonAnnex | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((personAnnex: HttpResponse<IPersonAnnex>) => {
          if (personAnnex.body) {
            return of(personAnnex.body);
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
