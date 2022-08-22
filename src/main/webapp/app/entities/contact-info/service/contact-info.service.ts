import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IContactInfo, NewContactInfo } from '../contact-info.model';

export type PartialUpdateContactInfo = Partial<IContactInfo> & Pick<IContactInfo, 'id'>;

export type EntityResponseType = HttpResponse<IContactInfo>;
export type EntityArrayResponseType = HttpResponse<IContactInfo[]>;

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contact-infos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(contactInfo: NewContactInfo): Observable<EntityResponseType> {
    return this.http.post<IContactInfo>(this.resourceUrl, contactInfo, { observe: 'response' });
  }

  update(contactInfo: IContactInfo): Observable<EntityResponseType> {
    return this.http.put<IContactInfo>(`${this.resourceUrl}/${this.getContactInfoIdentifier(contactInfo)}`, contactInfo, {
      observe: 'response',
    });
  }

  partialUpdate(contactInfo: PartialUpdateContactInfo): Observable<EntityResponseType> {
    return this.http.patch<IContactInfo>(`${this.resourceUrl}/${this.getContactInfoIdentifier(contactInfo)}`, contactInfo, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getContactInfoIdentifier(contactInfo: Pick<IContactInfo, 'id'>): number {
    return contactInfo.id;
  }

  compareContactInfo(o1: Pick<IContactInfo, 'id'> | null, o2: Pick<IContactInfo, 'id'> | null): boolean {
    return o1 && o2 ? this.getContactInfoIdentifier(o1) === this.getContactInfoIdentifier(o2) : o1 === o2;
  }

  addContactInfoToCollectionIfMissing<Type extends Pick<IContactInfo, 'id'>>(
    contactInfoCollection: Type[],
    ...contactInfosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contactInfos: Type[] = contactInfosToCheck.filter(isPresent);
    if (contactInfos.length > 0) {
      const contactInfoCollectionIdentifiers = contactInfoCollection.map(
        contactInfoItem => this.getContactInfoIdentifier(contactInfoItem)!
      );
      const contactInfosToAdd = contactInfos.filter(contactInfoItem => {
        const contactInfoIdentifier = this.getContactInfoIdentifier(contactInfoItem);
        if (contactInfoCollectionIdentifiers.includes(contactInfoIdentifier)) {
          return false;
        }
        contactInfoCollectionIdentifiers.push(contactInfoIdentifier);
        return true;
      });
      return [...contactInfosToAdd, ...contactInfoCollection];
    }
    return contactInfoCollection;
  }
}
