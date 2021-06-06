import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/thong-tin-sinh-vien',     title: 'Thông tin sinh viên',         icon:'far fa-id-card',       class: '' },
    { path: '/cong-viec',         title: 'Việc làm',             icon:'fas fa-laptop-code',    class: '' },
    { path: '/cong-viec-da-luu',          title: 'Việc làm đã lưu',              icon:'fas fa-heart',      class: '' },
    { path: '/dao-tao',          title: 'Seminar',      icon:'fas fa-book-open',  class: '' },
    { path: '/cong-ty',          title: 'Doanh nghiệp',      icon:'fas fa-landmark',  class: '' },
    { path: '/tin-nhan', title: 'Tin nhắn',     icon:'far fa-comment',    class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
