import { ContactType } from 'app/entities/enumerations/contact-type.model';

import { IContactInfo, NewContactInfo } from './contact-info.model';

export const sampleWithRequiredData: IContactInfo = {
  id: 8174,
};

export const sampleWithPartialData: IContactInfo = {
  id: 52218,
  contactValue: 'analyzer Wisconsin strategic',
};

export const sampleWithFullData: IContactInfo = {
  id: 93058,
  contactType: ContactType['EMAIL'],
  contactValue: 'Paradigm Taiwan firewall',
};

export const sampleWithNewData: NewContactInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
