import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../person-annex.test-samples';

import { PersonAnnexFormService } from './person-annex-form.service';

describe('PersonAnnex Form Service', () => {
  let service: PersonAnnexFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonAnnexFormService);
  });

  describe('Service methods', () => {
    describe('createPersonAnnexFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPersonAnnexFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nid: expect.any(Object),
            legacyNid: expect.any(Object),
            passportNumber: expect.any(Object),
            birthCertificateNumber: expect.any(Object),
            drivingLicenceNumber: expect.any(Object),
            tinCertificateNumber: expect.any(Object),
            facebookId: expect.any(Object),
            twitterId: expect.any(Object),
            linkedinId: expect.any(Object),
            githubId: expect.any(Object),
            tiktokId: expect.any(Object),
            instragramId: expect.any(Object),
            whatsappNumber: expect.any(Object),
            pinterestId: expect.any(Object),
            telegramId: expect.any(Object),
            rokomariId: expect.any(Object),
            rokomariJoinDate: expect.any(Object),
            techshopId: expect.any(Object),
            techshopJoinDate: expect.any(Object),
            udvashId: expect.any(Object),
            udvashJoinDate: expect.any(Object),
            prohoriId: expect.any(Object),
            prohoriJoinDate: expect.any(Object),
          })
        );
      });

      it('passing IPersonAnnex should create a new form with FormGroup', () => {
        const formGroup = service.createPersonAnnexFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nid: expect.any(Object),
            legacyNid: expect.any(Object),
            passportNumber: expect.any(Object),
            birthCertificateNumber: expect.any(Object),
            drivingLicenceNumber: expect.any(Object),
            tinCertificateNumber: expect.any(Object),
            facebookId: expect.any(Object),
            twitterId: expect.any(Object),
            linkedinId: expect.any(Object),
            githubId: expect.any(Object),
            tiktokId: expect.any(Object),
            instragramId: expect.any(Object),
            whatsappNumber: expect.any(Object),
            pinterestId: expect.any(Object),
            telegramId: expect.any(Object),
            rokomariId: expect.any(Object),
            rokomariJoinDate: expect.any(Object),
            techshopId: expect.any(Object),
            techshopJoinDate: expect.any(Object),
            udvashId: expect.any(Object),
            udvashJoinDate: expect.any(Object),
            prohoriId: expect.any(Object),
            prohoriJoinDate: expect.any(Object),
          })
        );
      });
    });

    describe('getPersonAnnex', () => {
      it('should return NewPersonAnnex for default PersonAnnex initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPersonAnnexFormGroup(sampleWithNewData);

        const personAnnex = service.getPersonAnnex(formGroup) as any;

        expect(personAnnex).toMatchObject(sampleWithNewData);
      });

      it('should return NewPersonAnnex for empty PersonAnnex initial value', () => {
        const formGroup = service.createPersonAnnexFormGroup();

        const personAnnex = service.getPersonAnnex(formGroup) as any;

        expect(personAnnex).toMatchObject({});
      });

      it('should return IPersonAnnex', () => {
        const formGroup = service.createPersonAnnexFormGroup(sampleWithRequiredData);

        const personAnnex = service.getPersonAnnex(formGroup) as any;

        expect(personAnnex).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPersonAnnex should not enable id FormControl', () => {
        const formGroup = service.createPersonAnnexFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPersonAnnex should disable id FormControl', () => {
        const formGroup = service.createPersonAnnexFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
