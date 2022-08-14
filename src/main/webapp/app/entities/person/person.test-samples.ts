import dayjs from 'dayjs/esm';

import { Gender } from 'app/entities/enumerations/gender.model';

import { IPerson, NewPerson } from './person.model';

export const sampleWithRequiredData: IPerson = {
  id: 31094,
};

export const sampleWithPartialData: IPerson = {
  id: 49035,
  name: 'connect Intelligent Bangladesh',
  dateOfBirth: dayjs('2022-08-14T03:17'),
  gender: Gender['FEMALE'],
};

export const sampleWithFullData: IPerson = {
  id: 41180,
  name: 'withdrawal concept',
  dateOfBirth: dayjs('2022-08-14T10:35'),
  dateOfDeath: dayjs('2022-08-13T19:29'),
  gender: Gender['MALE'],
};

export const sampleWithNewData: NewPerson = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
