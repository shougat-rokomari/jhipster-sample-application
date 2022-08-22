import dayjs from 'dayjs/esm';

export interface IPersonAnnex {
  id: number;
  nid?: number | null;
  legacyNid?: number | null;
  passportNumber?: string | null;
  birthCertificateNumber?: string | null;
  drivingLicenceNumber?: string | null;
  tinCertificateNumber?: string | null;
  facebookId?: string | null;
  twitterId?: string | null;
  linkedinId?: string | null;
  githubId?: string | null;
  tiktokId?: string | null;
  instragramId?: string | null;
  whatsappNumber?: string | null;
  pinterestId?: string | null;
  telegramId?: string | null;
  rokomariId?: number | null;
  rokomariJoinDate?: dayjs.Dayjs | null;
  techshopId?: number | null;
  techshopJoinDate?: dayjs.Dayjs | null;
  udvashId?: string | null;
  udvashJoinDate?: dayjs.Dayjs | null;
  prohoriId?: string | null;
  prohoriJoinDate?: dayjs.Dayjs | null;
}

export type NewPersonAnnex = Omit<IPersonAnnex, 'id'> & { id: null };
