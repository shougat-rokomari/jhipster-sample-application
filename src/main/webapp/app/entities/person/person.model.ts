import dayjs from 'dayjs/esm';
import { IPersonAnnex } from 'app/entities/person-annex/person-annex.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IPerson {
  id: number;
  name?: string | null;
  dateOfBirth?: dayjs.Dayjs | null;
  dateOfDeath?: dayjs.Dayjs | null;
  gender?: Gender | null;
  personAnnex?: Pick<IPersonAnnex, 'id'> | null;
}

export type NewPerson = Omit<IPerson, 'id'> & { id: null };
