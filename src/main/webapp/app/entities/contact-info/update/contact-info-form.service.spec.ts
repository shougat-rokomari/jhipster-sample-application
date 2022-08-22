import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../contact-info.test-samples';

import { ContactInfoFormService } from './contact-info-form.service';

describe('ContactInfo Form Service', () => {
  let service: ContactInfoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactInfoFormService);
  });

  describe('Service methods', () => {
    describe('createContactInfoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContactInfoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactType: expect.any(Object),
            contactValue: expect.any(Object),
            person: expect.any(Object),
          })
        );
      });

      it('passing IContactInfo should create a new form with FormGroup', () => {
        const formGroup = service.createContactInfoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            contactType: expect.any(Object),
            contactValue: expect.any(Object),
            person: expect.any(Object),
          })
        );
      });
    });

    describe('getContactInfo', () => {
      it('should return NewContactInfo for default ContactInfo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createContactInfoFormGroup(sampleWithNewData);

        const contactInfo = service.getContactInfo(formGroup) as any;

        expect(contactInfo).toMatchObject(sampleWithNewData);
      });

      it('should return NewContactInfo for empty ContactInfo initial value', () => {
        const formGroup = service.createContactInfoFormGroup();

        const contactInfo = service.getContactInfo(formGroup) as any;

        expect(contactInfo).toMatchObject({});
      });

      it('should return IContactInfo', () => {
        const formGroup = service.createContactInfoFormGroup(sampleWithRequiredData);

        const contactInfo = service.getContactInfo(formGroup) as any;

        expect(contactInfo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IContactInfo should not enable id FormControl', () => {
        const formGroup = service.createContactInfoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewContactInfo should disable id FormControl', () => {
        const formGroup = service.createContactInfoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
