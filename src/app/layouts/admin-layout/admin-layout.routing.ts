import { Routes } from '@angular/router';


import { TinTdComponent} from '../../pages/news/tin-td.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { LoginComponent } from 'app/login/login.component';
import { NewsDetailComponent } from 'app/pages/news-detail/news-detail.component';
import { StudentInfoComponent } from 'app/pages/student-info/student-info.component';
import { NewsSaveComponent } from 'app/pages/news-save/news-save.component';
import { CompanyComponent } from 'app/pages/company/company.component';
import { CompanyDetailComponent } from 'app/pages/company/company-detail/company-detail.component';
import { EducationComponent } from 'app/pages/education/education.component';
import { MessageComponent } from 'app/pages/message/message.component';
import { AuthGuardService  as AuthGuard  } from 'app/auth/auth-guard.service';


export const AdminLayoutRoutes: Routes = [

    { path: 'thong-tin-sinh-vien', component: StudentInfoComponent,
    canActivate: [AuthGuard]},
    { path: 'cong-viec',          component: TinTdComponent,canActivate: [AuthGuard]},
    { path: 'cong-viec/chi-tiet',     component: NewsDetailComponent,canActivate: [AuthGuard]},
    { path: 'cong-viec-da-luu',     component: NewsSaveComponent,canActivate: [AuthGuard]},
    { path: 'cong-ty',        component: CompanyComponent,canActivate: [AuthGuard]},
    { path: 'cong-ty/chi-tiet',        component: CompanyDetailComponent,canActivate: [AuthGuard]},
    { path: 'dao-tao',        component: EducationComponent,canActivate: [AuthGuard]},
    { path: 'tin-nhan',        component: MessageComponent,canActivate: [AuthGuard]},

    { path: 'dashboard',      component: DashboardComponent,canActivate: [AuthGuard] },
    { path: 'user',           component: UserComponent,canActivate: [AuthGuard] },
    { path: 'table',          component: TableComponent,canActivate: [AuthGuard] },
    { path: 'typography',     component: TypographyComponent,canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent,canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent,canActivate: [AuthGuard] },
    { path: 'notifications',  component: NotificationsComponent,canActivate: [AuthGuard] },
    // { path: 'upgrade',        component: UpgradeComponent,canActivate: [AuthGuard] }
];
