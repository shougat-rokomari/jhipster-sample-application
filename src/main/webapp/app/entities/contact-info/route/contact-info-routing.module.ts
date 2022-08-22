import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ContactInfoComponent } from '../list/contact-info.component';
import { ContactInfoDetailComponent } from '../detail/contact-info-detail.component';
import { ContactInfoUpdateComponent } from '../update/contact-info-update.component';
import { ContactInfoRoutingResolveService } from './contact-info-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const contactInfoRoute: Routes = [
  {
    path: '',
    component: ContactInfoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContactInfoDetailComponent,
    resolve: {
      contactInfo: ContactInfoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContactInfoUpdateComponent,
    resolve: {
      contactInfo: ContactInfoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContactInfoUpdateComponent,
    resolve: {
      contactInfo: ContactInfoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contactInfoRoute)],
  exports: [RouterModule],
})
export class ContactInfoRoutingModule {}
