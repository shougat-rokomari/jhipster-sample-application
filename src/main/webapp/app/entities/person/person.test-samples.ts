import dayjs from 'dayjs/esm';

import { Gender } from 'app/entities/enumerations/gender.model';

import { IPerson, NewPerson } from './person.model';

export const sampleWithRequiredData: IPerson = {
  id: 31094,
};

export const sampleWithPartialData: IPerson = {
  id: 49035,
  name: 'connect Intelligent Bangladesh',
  dateOfBirth: dayjs('2022-08-21T23:36'),
  gender: Gender['FEMALE'],
};

export const sampleWithFullData: IPerson = {
  id: 41180,
  name: 'withdrawal concept',
  dateOfBirth: dayjs('2022-08-22T06:55'),
  dateOfDeath: dayjs('2022-08-21T15:48'),
  gender: Gender['MALE'],
};

export const sampleWithNewData: NewPerson = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
