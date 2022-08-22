import { IPerson } from 'app/entities/person/person.model';
import { ContactType } from 'app/entities/enumerations/contact-type.model';

export interface IContactInfo {
  id: number;
  contactType?: ContactType | null;
  contactValue?: string | null;
  person?: Pick<IPerson, 'id'> | null;
}

export type NewContactInfo = Omit<IContactInfo, 'id'> & { id: null };
