import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPersonAnnex, NewPersonAnnex } from '../person-annex.model';

export type PartialUpdatePersonAnnex = Partial<IPersonAnnex> & Pick<IPersonAnnex, 'id'>;

type RestOf<T extends IPersonAnnex | NewPersonAnnex> = Omit<
  T,
  'rokomariJoinDate' | 'techshopJoinDate' | 'udvashJoinDate' | 'prohoriJoinDate'
> & {
  rokomariJoinDate?: string | null;
  techshopJoinDate?: string | null;
  udvashJoinDate?: string | null;
  prohoriJoinDate?: string | null;
};

export type RestPersonAnnex = RestOf<IPersonAnnex>;

export type NewRestPersonAnnex = RestOf<NewPersonAnnex>;

export type PartialUpdateRestPersonAnnex = RestOf<PartialUpdatePersonAnnex>;

export type EntityResponseType = HttpResponse<IPersonAnnex>;
export type EntityArrayResponseType = HttpResponse<IPersonAnnex[]>;

@Injectable({ providedIn: 'root' })
export class PersonAnnexService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/person-annexes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(personAnnex: NewPersonAnnex): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personAnnex);
    return this.http
      .post<RestPersonAnnex>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(personAnnex: IPersonAnnex): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personAnnex);
    return this.http
      .put<RestPersonAnnex>(`${this.resourceUrl}/${this.getPersonAnnexIdentifier(personAnnex)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(personAnnex: PartialUpdatePersonAnnex): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(personAnnex);
    return this.http
      .patch<RestPersonAnnex>(`${this.resourceUrl}/${this.getPersonAnnexIdentifier(personAnnex)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPersonAnnex>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPersonAnnex[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPersonAnnexIdentifier(personAnnex: Pick<IPersonAnnex, 'id'>): number {
    return personAnnex.id;
  }

  comparePersonAnnex(o1: Pick<IPersonAnnex, 'id'> | null, o2: Pick<IPersonAnnex, 'id'> | null): boolean {
    return o1 && o2 ? this.getPersonAnnexIdentifier(o1) === this.getPersonAnnexIdentifier(o2) : o1 === o2;
  }

  addPersonAnnexToCollectionIfMissing<Type extends Pick<IPersonAnnex, 'id'>>(
    personAnnexCollection: Type[],
    ...personAnnexesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const personAnnexes: Type[] = personAnnexesToCheck.filter(isPresent);
    if (personAnnexes.length > 0) {
      const personAnnexCollectionIdentifiers = personAnnexCollection.map(
        personAnnexItem => this.getPersonAnnexIdentifier(personAnnexItem)!
      );
      const personAnnexesToAdd = personAnnexes.filter(personAnnexItem => {
        const personAnnexIdentifier = this.getPersonAnnexIdentifier(personAnnexItem);
        if (personAnnexCollectionIdentifiers.includes(personAnnexIdentifier)) {
          return false;
        }
        personAnnexCollectionIdentifiers.push(personAnnexIdentifier);
        return true;
      });
      return [...personAnnexesToAdd, ...personAnnexCollection];
    }
    return personAnnexCollection;
  }

  protected convertDateFromClient<T extends IPersonAnnex | NewPersonAnnex | PartialUpdatePersonAnnex>(personAnnex: T): RestOf<T> {
    return {
      ...personAnnex,
      rokomariJoinDate: personAnnex.rokomariJoinDate?.toJSON() ?? null,
      techshopJoinDate: personAnnex.techshopJoinDate?.toJSON() ?? null,
      udvashJoinDate: personAnnex.udvashJoinDate?.toJSON() ?? null,
      prohoriJoinDate: personAnnex.prohoriJoinDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPersonAnnex: RestPersonAnnex): IPersonAnnex {
    return {
      ...restPersonAnnex,
      rokomariJoinDate: restPersonAnnex.rokomariJoinDate ? dayjs(restPersonAnnex.rokomariJoinDate) : undefined,
      techshopJoinDate: restPersonAnnex.techshopJoinDate ? dayjs(restPersonAnnex.techshopJoinDate) : undefined,
      udvashJoinDate: restPersonAnnex.udvashJoinDate ? dayjs(restPersonAnnex.udvashJoinDate) : undefined,
      prohoriJoinDate: restPersonAnnex.prohoriJoinDate ? dayjs(restPersonAnnex.prohoriJoinDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPersonAnnex>): HttpResponse<IPersonAnnex> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPersonAnnex[]>): HttpResponse<IPersonAnnex[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
