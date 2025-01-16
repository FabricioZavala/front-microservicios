import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesProfileComponent } from './pages/pages-profile/pages-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { CardInfoUserComponent } from './components/cards/infor-user/card-info-user/card-info-user.component';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    PagesProfileComponent,
    CardInfoUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
