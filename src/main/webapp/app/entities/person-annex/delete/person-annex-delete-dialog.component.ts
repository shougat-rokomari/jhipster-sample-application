import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPersonAnnex } from '../person-annex.model';
import { PersonAnnexService } from '../service/person-annex.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './person-annex-delete-dialog.component.html',
})
export class PersonAnnexDeleteDialogComponent {
  personAnnex?: IPersonAnnex;

  constructor(protected personAnnexService: PersonAnnexService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personAnnexService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
