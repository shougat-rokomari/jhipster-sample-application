import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPersonAnnex, NewPersonAnnex } from '../person-annex.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPersonAnnex for edit and NewPersonAnnexFormGroupInput for create.
 */
type PersonAnnexFormGroupInput = IPersonAnnex | PartialWithRequiredKeyOf<NewPersonAnnex>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPersonAnnex | NewPersonAnnex> = Omit<
  T,
  'rokomariJoinDate' | 'techshopJoinDate' | 'udvashJoinDate' | 'prohoriJoinDate'
> & {
  rokomariJoinDate?: string | null;
  techshopJoinDate?: string | null;
  udvashJoinDate?: string | null;
  prohoriJoinDate?: string | null;
};

type PersonAnnexFormRawValue = FormValueOf<IPersonAnnex>;

type NewPersonAnnexFormRawValue = FormValueOf<NewPersonAnnex>;

type PersonAnnexFormDefaults = Pick<NewPersonAnnex, 'id' | 'rokomariJoinDate' | 'techshopJoinDate' | 'udvashJoinDate' | 'prohoriJoinDate'>;

type PersonAnnexFormGroupContent = {
  id: FormControl<PersonAnnexFormRawValue['id'] | NewPersonAnnex['id']>;
  nid: FormControl<PersonAnnexFormRawValue['nid']>;
  legacyNid: FormControl<PersonAnnexFormRawValue['legacyNid']>;
  passportNumber: FormControl<PersonAnnexFormRawValue['passportNumber']>;
  birthCertificateNumber: FormControl<PersonAnnexFormRawValue['birthCertificateNumber']>;
  drivingLicenceNumber: FormControl<PersonAnnexFormRawValue['drivingLicenceNumber']>;
  tinCertificateNumber: FormControl<PersonAnnexFormRawValue['tinCertificateNumber']>;
  facebookId: FormControl<PersonAnnexFormRawValue['facebookId']>;
  twitterId: FormControl<PersonAnnexFormRawValue['twitterId']>;
  linkedinId: FormControl<PersonAnnexFormRawValue['linkedinId']>;
  githubId: FormControl<PersonAnnexFormRawValue['githubId']>;
  tiktokId: FormControl<PersonAnnexFormRawValue['tiktokId']>;
  instragramId: FormControl<PersonAnnexFormRawValue['instragramId']>;
  whatsappNumber: FormControl<PersonAnnexFormRawValue['whatsappNumber']>;
  pinterestId: FormControl<PersonAnnexFormRawValue['pinterestId']>;
  telegramId: FormControl<PersonAnnexFormRawValue['telegramId']>;
  rokomariId: FormControl<PersonAnnexFormRawValue['rokomariId']>;
  rokomariJoinDate: FormControl<PersonAnnexFormRawValue['rokomariJoinDate']>;
  techshopId: FormControl<PersonAnnexFormRawValue['techshopId']>;
  techshopJoinDate: FormControl<PersonAnnexFormRawValue['techshopJoinDate']>;
  udvashId: FormControl<PersonAnnexFormRawValue['udvashId']>;
  udvashJoinDate: FormControl<PersonAnnexFormRawValue['udvashJoinDate']>;
  prohoriId: FormControl<PersonAnnexFormRawValue['prohoriId']>;
  prohoriJoinDate: FormControl<PersonAnnexFormRawValue['prohoriJoinDate']>;
};

export type PersonAnnexFormGroup = FormGroup<PersonAnnexFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PersonAnnexFormService {
  createPersonAnnexFormGroup(personAnnex: PersonAnnexFormGroupInput = { id: null }): PersonAnnexFormGroup {
    const personAnnexRawValue = this.convertPersonAnnexToPersonAnnexRawValue({
      ...this.getFormDefaults(),
      ...personAnnex,
    });
    return new FormGroup<PersonAnnexFormGroupContent>({
      id: new FormControl(
        { value: personAnnexRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nid: new FormControl(personAnnexRawValue.nid),
      legacyNid: new FormControl(personAnnexRawValue.legacyNid),
      passportNumber: new FormControl(personAnnexRawValue.passportNumber),
      birthCertificateNumber: new FormControl(personAnnexRawValue.birthCertificateNumber),
      drivingLicenceNumber: new FormControl(personAnnexRawValue.drivingLicenceNumber),
      tinCertificateNumber: new FormControl(personAnnexRawValue.tinCertificateNumber),
      facebookId: new FormControl(personAnnexRawValue.facebookId),
      twitterId: new FormControl(personAnnexRawValue.twitterId),
      linkedinId: new FormControl(personAnnexRawValue.linkedinId),
      githubId: new FormControl(personAnnexRawValue.githubId),
      tiktokId: new FormControl(personAnnexRawValue.tiktokId),
      instragramId: new FormControl(personAnnexRawValue.instragramId),
      whatsappNumber: new FormControl(personAnnexRawValue.whatsappNumber),
      pinterestId: new FormControl(personAnnexRawValue.pinterestId),
      telegramId: new FormControl(personAnnexRawValue.telegramId),
      rokomariId: new FormControl(personAnnexRawValue.rokomariId),
      rokomariJoinDate: new FormControl(personAnnexRawValue.rokomariJoinDate),
      techshopId: new FormControl(personAnnexRawValue.techshopId),
      techshopJoinDate: new FormControl(personAnnexRawValue.techshopJoinDate),
      udvashId: new FormControl(personAnnexRawValue.udvashId),
      udvashJoinDate: new FormControl(personAnnexRawValue.udvashJoinDate),
      prohoriId: new FormControl(personAnnexRawValue.prohoriId),
      prohoriJoinDate: new FormControl(personAnnexRawValue.prohoriJoinDate),
    });
  }

  getPersonAnnex(form: PersonAnnexFormGroup): IPersonAnnex | NewPersonAnnex {
    return this.convertPersonAnnexRawValueToPersonAnnex(form.getRawValue() as PersonAnnexFormRawValue | NewPersonAnnexFormRawValue);
  }

  resetForm(form: PersonAnnexFormGroup, personAnnex: PersonAnnexFormGroupInput): void {
    const personAnnexRawValue = this.convertPersonAnnexToPersonAnnexRawValue({ ...this.getFormDefaults(), ...personAnnex });
    form.reset(
      {
        ...personAnnexRawValue,
        id: { value: personAnnexRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PersonAnnexFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      rokomariJoinDate: currentTime,
      techshopJoinDate: currentTime,
      udvashJoinDate: currentTime,
      prohoriJoinDate: currentTime,
    };
  }

  private convertPersonAnnexRawValueToPersonAnnex(
    rawPersonAnnex: PersonAnnexFormRawValue | NewPersonAnnexFormRawValue
  ): IPersonAnnex | NewPersonAnnex {
    return {
      ...rawPersonAnnex,
      rokomariJoinDate: dayjs(rawPersonAnnex.rokomariJoinDate, DATE_TIME_FORMAT),
      techshopJoinDate: dayjs(rawPersonAnnex.techshopJoinDate, DATE_TIME_FORMAT),
      udvashJoinDate: dayjs(rawPersonAnnex.udvashJoinDate, DATE_TIME_FORMAT),
      prohoriJoinDate: dayjs(rawPersonAnnex.prohoriJoinDate, DATE_TIME_FORMAT),
    };
  }

  private convertPersonAnnexToPersonAnnexRawValue(
    personAnnex: IPersonAnnex | (Partial<NewPersonAnnex> & PersonAnnexFormDefaults)
  ): PersonAnnexFormRawValue | PartialWithRequiredKeyOf<NewPersonAnnexFormRawValue> {
    return {
      ...personAnnex,
      rokomariJoinDate: personAnnex.rokomariJoinDate ? personAnnex.rokomariJoinDate.format(DATE_TIME_FORMAT) : undefined,
      techshopJoinDate: personAnnex.techshopJoinDate ? personAnnex.techshopJoinDate.format(DATE_TIME_FORMAT) : undefined,
      udvashJoinDate: personAnnex.udvashJoinDate ? personAnnex.udvashJoinDate.format(DATE_TIME_FORMAT) : undefined,
      prohoriJoinDate: personAnnex.prohoriJoinDate ? personAnnex.prohoriJoinDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
