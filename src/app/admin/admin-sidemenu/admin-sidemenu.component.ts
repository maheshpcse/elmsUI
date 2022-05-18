import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
declare var $: any;

@Component({
    selector: 'app-admin-sidemenu',
    templateUrl: './admin-sidemenu.component.html',
    styleUrls: ['./admin-sidemenu.component.css']
})
export class AdminSidemenuComponent implements OnInit {

    public href: any = null;
    public role: any = sessionStorage.getItem('role');

    constructor(
        public router: Router,
        public authAdminService: AuthAdminService
    ) { }

    ngOnInit() {
        console.log('current url isss', this.router.url);
        this.href = this.router.url;
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
        // let divSidebar: any = document.getElementById('sidebar');
        // console.log('In ngOnInit() divSidebar isss', divSidebar);
        // if (divSidebar && sessionStorage.getItem('sidebar_style')) {
        //   divSidebar.style.marginLeft = sessionStorage.getItem('sidebar_style');
        // }
    }

    setAriaExpandFun(item?: any) {
        if (Number(item) === 1) {
            if (this.href === '/add-employee' || this.href === '/manage-employee') {
                return true;
            } else {
                return false;
            }
        } else if (Number(item) === 2) {
            if (this.href === '/add-department' || this.href === '/manage-department') {
                return true;
            } else {
                return false;
            }
        } else if (Number(item) === 3) {
            if (this.href === '/add-leavetype' || this.href === '/manage-leavetype') {
                return true;
            } else {
                return false;
            }
        } else if (Number(item) === 4) {
            if (this.href === '/all-leaves' || this.href === '/pending-leaves' || this.href === '/approved-leaves' || this.href === '/rejected-leaves') {
                return true;
            } else {
                return false;
            }
        }
    }

    logOut() {
        $('#logoutConfirmModal').modal('hide');
        this.authAdminService.isLoggedOut(this.role);
        this.role = '';
    }

}
