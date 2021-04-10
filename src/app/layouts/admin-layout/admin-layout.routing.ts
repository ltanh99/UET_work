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
import { CompanyDetailComponent } from 'app/pages/company-detail/company-detail.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'thong-tin-sinh-vien', component: StudentInfoComponent},
    { path: 'cong-viec',          component: TinTdComponent },
    { path: 'cong-viec/chi-tiet',     component: NewsDetailComponent},
    { path: 'cong-viec-da-luu',     component: NewsSaveComponent},
    { path: 'cong-ty',        component: CompanyComponent},
    { path: 'cong-ty/chi-tiet',        component: CompanyDetailComponent},

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
