import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPerson, NewPerson } from '../person.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPerson for edit and NewPersonFormGroupInput for create.
 */
type PersonFormGroupInput = IPerson | PartialWithRequiredKeyOf<NewPerson>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPerson | NewPerson> = Omit<T, 'dateOfBirth' | 'dateOfDeath'> & {
  dateOfBirth?: string | null;
  dateOfDeath?: string | null;
};

type PersonFormRawValue = FormValueOf<IPerson>;

type NewPersonFormRawValue = FormValueOf<NewPerson>;

type PersonFormDefaults = Pick<NewPerson, 'id' | 'dateOfBirth' | 'dateOfDeath'>;

type PersonFormGroupContent = {
  id: FormControl<PersonFormRawValue['id'] | NewPerson['id']>;
  name: FormControl<PersonFormRawValue['name']>;
  dateOfBirth: FormControl<PersonFormRawValue['dateOfBirth']>;
  dateOfDeath: FormControl<PersonFormRawValue['dateOfDeath']>;
  gender: FormControl<PersonFormRawValue['gender']>;
  personAnnex: FormControl<PersonFormRawValue['personAnnex']>;
};

export type PersonFormGroup = FormGroup<PersonFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PersonFormService {
  createPersonFormGroup(person: PersonFormGroupInput = { id: null }): PersonFormGroup {
    const personRawValue = this.convertPersonToPersonRawValue({
      ...this.getFormDefaults(),
      ...person,
    });
    return new FormGroup<PersonFormGroupContent>({
      id: new FormControl(
        { value: personRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(personRawValue.name),
      dateOfBirth: new FormControl(personRawValue.dateOfBirth),
      dateOfDeath: new FormControl(personRawValue.dateOfDeath),
      gender: new FormControl(personRawValue.gender),
      personAnnex: new FormControl(personRawValue.personAnnex),
    });
  }

  getPerson(form: PersonFormGroup): IPerson | NewPerson {
    return this.convertPersonRawValueToPerson(form.getRawValue() as PersonFormRawValue | NewPersonFormRawValue);
  }

  resetForm(form: PersonFormGroup, person: PersonFormGroupInput): void {
    const personRawValue = this.convertPersonToPersonRawValue({ ...this.getFormDefaults(), ...person });
    form.reset(
      {
        ...personRawValue,
        id: { value: personRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PersonFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateOfBirth: currentTime,
      dateOfDeath: currentTime,
    };
  }

  private convertPersonRawValueToPerson(rawPerson: PersonFormRawValue | NewPersonFormRawValue): IPerson | NewPerson {
    return {
      ...rawPerson,
      dateOfBirth: dayjs(rawPerson.dateOfBirth, DATE_TIME_FORMAT),
      dateOfDeath: dayjs(rawPerson.dateOfDeath, DATE_TIME_FORMAT),
    };
  }

  private convertPersonToPersonRawValue(
    person: IPerson | (Partial<NewPerson> & PersonFormDefaults)
  ): PersonFormRawValue | PartialWithRequiredKeyOf<NewPersonFormRawValue> {
    return {
      ...person,
      dateOfBirth: person.dateOfBirth ? person.dateOfBirth.format(DATE_TIME_FORMAT) : undefined,
      dateOfDeath: person.dateOfDeath ? person.dateOfDeath.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
