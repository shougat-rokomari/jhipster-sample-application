import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IContactInfo } from '../contact-info.model';
import { ContactInfoService } from '../service/contact-info.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './contact-info-delete-dialog.component.html',
})
export class ContactInfoDeleteDialogComponent {
  contactInfo?: IContactInfo;

  constructor(protected contactInfoService: ContactInfoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contactInfoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
