import dayjs from 'dayjs/esm';

import { IPersonAnnex, NewPersonAnnex } from './person-annex.model';

export const sampleWithRequiredData: IPersonAnnex = {
  id: 35705,
};

export const sampleWithPartialData: IPersonAnnex = {
  id: 47097,
  tinCertificateNumber: 'parsing Wooden',
  facebookId: 'uniform',
  linkedinId: 'capacitor Market navigating',
  instragramId: 'RAM Ergonomic',
  whatsappNumber: 'Mississippi Clothing',
  pinterestId: 'Serbian robust Digitized',
  telegramId: 'up',
  rokomariId: 30628,
  rokomariJoinDate: dayjs('2022-08-22T08:01'),
  techshopId: 47771,
  udvashId: 'New HTTP',
  udvashJoinDate: dayjs('2022-08-22T03:32'),
  prohoriId: 'Australia Specialist Pizza',
};

export const sampleWithFullData: IPersonAnnex = {
  id: 59461,
  nid: 79361,
  legacyNid: 68954,
  passportNumber: 'Glens PCI',
  birthCertificateNumber: 'Georgia Metal Towels',
  drivingLicenceNumber: 'Land Savings orchestrate',
  tinCertificateNumber: 'Dram',
  facebookId: 'Architect',
  twitterId: 'grey',
  linkedinId: 'Music Avon Small',
  githubId: 'Shoes Shilling payment',
  tiktokId: 'Fully-configurable',
  instragramId: 'deposit',
  whatsappNumber: 'New',
  pinterestId: 'Unbranded Buckinghamshire Soap',
  telegramId: 'Rupee Concrete Account',
  rokomariId: 29294,
  rokomariJoinDate: dayjs('2022-08-21T13:53'),
  techshopId: 11120,
  techshopJoinDate: dayjs('2022-08-21T19:02'),
  udvashId: 'Buckinghamshire open',
  udvashJoinDate: dayjs('2022-08-21T17:07'),
  prohoriId: 'Mouse',
  prohoriJoinDate: dayjs('2022-08-21T12:37'),
};

export const sampleWithNewData: NewPersonAnnex = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
