import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DragulaModule } from "ng2-dragula";
import { TranslateModule } from '@ngx-translate/core';
// Components
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { FullComponent } from './components/layout/full/full.component';
import { ContentComponent } from './components/layout/content/content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LanguagesComponent } from './components/header/elements/languages/languages.component';
import { MyAccountComponent } from './components/header/elements/my-account/my-account.component';
import { NotificationComponent } from './components/header/elements/notification/notification.component';
import { CustomPaginationComponent } from './components/paginations/custom-pagination/custom-pagination.component';

@NgModule({
  declarations: [
    FeatherIconsComponent,
    TapToTopComponent,
    FullComponent,
    ContentComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SvgIconComponent,
    LoaderComponent,
    LanguagesComponent,
    MyAccountComponent,
    NotificationComponent,
    CustomPaginationComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // DragulaModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TapToTopComponent,
    BreadcrumbComponent,
    CustomPaginationComponent
  ],
})
export class SharedModule {}
