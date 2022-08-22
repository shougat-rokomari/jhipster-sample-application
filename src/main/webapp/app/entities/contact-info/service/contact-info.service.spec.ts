import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IContactInfo } from '../contact-info.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../contact-info.test-samples';

import { ContactInfoService } from './contact-info.service';

const requireRestSample: IContactInfo = {
  ...sampleWithRequiredData,
};

describe('ContactInfo Service', () => {
  let service: ContactInfoService;
  let httpMock: HttpTestingController;
  let expectedResult: IContactInfo | IContactInfo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContactInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ContactInfo', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const contactInfo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(contactInfo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ContactInfo', () => {
      const contactInfo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(contactInfo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ContactInfo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ContactInfo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ContactInfo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addContactInfoToCollectionIfMissing', () => {
      it('should add a ContactInfo to an empty array', () => {
        const contactInfo: IContactInfo = sampleWithRequiredData;
        expectedResult = service.addContactInfoToCollectionIfMissing([], contactInfo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contactInfo);
      });

      it('should not add a ContactInfo to an array that contains it', () => {
        const contactInfo: IContactInfo = sampleWithRequiredData;
        const contactInfoCollection: IContactInfo[] = [
          {
            ...contactInfo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContactInfoToCollectionIfMissing(contactInfoCollection, contactInfo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ContactInfo to an array that doesn't contain it", () => {
        const contactInfo: IContactInfo = sampleWithRequiredData;
        const contactInfoCollection: IContactInfo[] = [sampleWithPartialData];
        expectedResult = service.addContactInfoToCollectionIfMissing(contactInfoCollection, contactInfo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contactInfo);
      });

      it('should add only unique ContactInfo to an array', () => {
        const contactInfoArray: IContactInfo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const contactInfoCollection: IContactInfo[] = [sampleWithRequiredData];
        expectedResult = service.addContactInfoToCollectionIfMissing(contactInfoCollection, ...contactInfoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contactInfo: IContactInfo = sampleWithRequiredData;
        const contactInfo2: IContactInfo = sampleWithPartialData;
        expectedResult = service.addContactInfoToCollectionIfMissing([], contactInfo, contactInfo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contactInfo);
        expect(expectedResult).toContain(contactInfo2);
      });

      it('should accept null and undefined values', () => {
        const contactInfo: IContactInfo = sampleWithRequiredData;
        expectedResult = service.addContactInfoToCollectionIfMissing([], null, contactInfo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contactInfo);
      });

      it('should return initial array if no ContactInfo is added', () => {
        const contactInfoCollection: IContactInfo[] = [sampleWithRequiredData];
        expectedResult = service.addContactInfoToCollectionIfMissing(contactInfoCollection, undefined, null);
        expect(expectedResult).toEqual(contactInfoCollection);
      });
    });

    describe('compareContactInfo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareContactInfo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareContactInfo(entity1, entity2);
        const compareResult2 = service.compareContactInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareContactInfo(entity1, entity2);
        const compareResult2 = service.compareContactInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareContactInfo(entity1, entity2);
        const compareResult2 = service.compareContactInfo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
