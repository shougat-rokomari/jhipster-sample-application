import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPersonAnnex } from '../person-annex.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../person-annex.test-samples';

import { PersonAnnexService, RestPersonAnnex } from './person-annex.service';

const requireRestSample: RestPersonAnnex = {
  ...sampleWithRequiredData,
  rokomariJoinDate: sampleWithRequiredData.rokomariJoinDate?.toJSON(),
  techshopJoinDate: sampleWithRequiredData.techshopJoinDate?.toJSON(),
  udvashJoinDate: sampleWithRequiredData.udvashJoinDate?.toJSON(),
  prohoriJoinDate: sampleWithRequiredData.prohoriJoinDate?.toJSON(),
};

describe('PersonAnnex Service', () => {
  let service: PersonAnnexService;
  let httpMock: HttpTestingController;
  let expectedResult: IPersonAnnex | IPersonAnnex[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PersonAnnexService);
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

    it('should create a PersonAnnex', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const personAnnex = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(personAnnex).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PersonAnnex', () => {
      const personAnnex = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(personAnnex).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PersonAnnex', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PersonAnnex', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PersonAnnex', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPersonAnnexToCollectionIfMissing', () => {
      it('should add a PersonAnnex to an empty array', () => {
        const personAnnex: IPersonAnnex = sampleWithRequiredData;
        expectedResult = service.addPersonAnnexToCollectionIfMissing([], personAnnex);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(personAnnex);
      });

      it('should not add a PersonAnnex to an array that contains it', () => {
        const personAnnex: IPersonAnnex = sampleWithRequiredData;
        const personAnnexCollection: IPersonAnnex[] = [
          {
            ...personAnnex,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPersonAnnexToCollectionIfMissing(personAnnexCollection, personAnnex);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PersonAnnex to an array that doesn't contain it", () => {
        const personAnnex: IPersonAnnex = sampleWithRequiredData;
        const personAnnexCollection: IPersonAnnex[] = [sampleWithPartialData];
        expectedResult = service.addPersonAnnexToCollectionIfMissing(personAnnexCollection, personAnnex);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(personAnnex);
      });

      it('should add only unique PersonAnnex to an array', () => {
        const personAnnexArray: IPersonAnnex[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const personAnnexCollection: IPersonAnnex[] = [sampleWithRequiredData];
        expectedResult = service.addPersonAnnexToCollectionIfMissing(personAnnexCollection, ...personAnnexArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const personAnnex: IPersonAnnex = sampleWithRequiredData;
        const personAnnex2: IPersonAnnex = sampleWithPartialData;
        expectedResult = service.addPersonAnnexToCollectionIfMissing([], personAnnex, personAnnex2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(personAnnex);
        expect(expectedResult).toContain(personAnnex2);
      });

      it('should accept null and undefined values', () => {
        const personAnnex: IPersonAnnex = sampleWithRequiredData;
        expectedResult = service.addPersonAnnexToCollectionIfMissing([], null, personAnnex, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(personAnnex);
      });

      it('should return initial array if no PersonAnnex is added', () => {
        const personAnnexCollection: IPersonAnnex[] = [sampleWithRequiredData];
        expectedResult = service.addPersonAnnexToCollectionIfMissing(personAnnexCollection, undefined, null);
        expect(expectedResult).toEqual(personAnnexCollection);
      });
    });

    describe('comparePersonAnnex', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePersonAnnex(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePersonAnnex(entity1, entity2);
        const compareResult2 = service.comparePersonAnnex(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePersonAnnex(entity1, entity2);
        const compareResult2 = service.comparePersonAnnex(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePersonAnnex(entity1, entity2);
        const compareResult2 = service.comparePersonAnnex(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
