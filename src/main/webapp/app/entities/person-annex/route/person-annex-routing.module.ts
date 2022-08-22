import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PersonAnnexComponent } from '../list/person-annex.component';
import { PersonAnnexDetailComponent } from '../detail/person-annex-detail.component';
import { PersonAnnexUpdateComponent } from '../update/person-annex-update.component';
import { PersonAnnexRoutingResolveService } from './person-annex-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const personAnnexRoute: Routes = [
  {
    path: '',
    component: PersonAnnexComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonAnnexDetailComponent,
    resolve: {
      personAnnex: PersonAnnexRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersonAnnexUpdateComponent,
    resolve: {
      personAnnex: PersonAnnexRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersonAnnexUpdateComponent,
    resolve: {
      personAnnex: PersonAnnexRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(personAnnexRoute)],
  exports: [RouterModule],
})
export class PersonAnnexRoutingModule {}
