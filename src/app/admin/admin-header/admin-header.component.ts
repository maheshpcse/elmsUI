import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

    setIcon: any = 'fas fa-angle-left';
    setStyles: any = '250px';
    public href: any = null;
    nfCount: any = 0;

    startSession: any = null;
    endSession: any = null;
    sessionTime: any = '30:00';
    isValid: any = false;
    public role: any = sessionStorage.getItem('role');
    public refreshToken: any = sessionStorage.getItem('refreshToken');
    public displayName: any = sessionStorage.getItem('displayName');
    public colorObj: any = {
        'blue': this.sessionTime > '00:30' && this.sessionTime <= '01:00',
        'red': this.sessionTime >= '00:00' && this.sessionTime <= '00:30'
    }

    constructor(
        public router: Router,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.getSessionTime();

        console.log('current url isss', this.router.url);
        this.href = this.router.url;

        this.authAdminService.bSubject.subscribe((value: any) => {
            console.log("Subscription got", value);
            this.nfCount += value == 'default' ? 0 : Number(value);
        });

        // this.authAdminService.getNotifications().subscribe(async (response: any) => {
        //   console.log('Get notifications data response isss', response);
        //   if (response.success) {
        //     this.nfCount += 1;
        //   } else {
        //     this.toastr.errorToastr(response.message);
        //   }
        // }, (error: any) => {
        //   this.toastr.errorToastr('Network failed, Please try again.');
        // });

        // set styles and icon
        // let divContent: any = document.getElementById('content');
        // if (divContent && sessionStorage.getItem('content_style') && sessionStorage.getItem('icon')) {
        //   divContent.style.marginLeft = sessionStorage.getItem('content_style');
        //   this.setIcon = sessionStorage.getItem('icon');
        // }
    }

    onToggleSideNav() {
        $('#sidebarCollapse').toggleClass('active');
        // set main content styles
        let divContent: any = document.getElementById('content');
        console.log('divContent isss', divContent);
        if (divContent && divContent.style.marginLeft !== '0px') {
            divContent.style.marginLeft = '0px';
            this.setIcon = 'fas fa-angle-right';
            // sessionStorage.setItem('icon', 'fas fa-angle-right');
            // sessionStorage.setItem('content_style', '0px');
        } else if (divContent && divContent.style.marginLeft == '0px') {
            divContent.style.marginLeft = '250px';
            this.setIcon = 'fas fa-angle-left';
            // sessionStorage.setItem('icon', 'fas fa-angle-left');
            // sessionStorage.setItem('content_style', '250px');
        }

        // set navbar styles
        let divNavbar: any = document.getElementsByClassName('navbar');
        console.log('divNavbar isss', divNavbar);
        if (divNavbar && divNavbar.length) {
            console.log(divNavbar[0].style["left"]);
            if (!divNavbar[0].style["left"] || divNavbar[0].style["left"] == '250px') {
                divNavbar[0].style["left"] = '0px';
            } else if (divNavbar[0].style["left"] == '0px') {
                divNavbar[0].style['left'] = '250px';
            }
        }

        // set sidebar styles
        let divSidebar: any = document.getElementById('admin-sidebar');
        console.log('divSidebar isss', divSidebar);
        if (divSidebar && divSidebar.style.marginLeft !== '-250px') {
            divSidebar.style.marginLeft = '-250px';
            // sessionStorage.setItem('sidebar_style', '-250px');
        } else if (divSidebar && divSidebar.style.marginLeft == '-250px') {
            divSidebar.style.marginLeft = '0px';
            // sessionStorage.setItem('sidebar_style', '0px');
        }
    }

    getSessionTime() {
        this.sessionTime = '30:00';
        if (this.authAdminService.isLoggedIn() || this.isValid) {
            console.log('called getSessionTime()');
            this.startSession = setInterval(() => {
                const tempSessionTime = `${moment().format('YYYY-MM-DD')} 00:${this.sessionTime}`;
                this.sessionTime = moment(tempSessionTime).subtract(1, 'seconds').format('mm:ss');
                // console.log('sessionTime isss:', this.sessionTime);
                if (this.sessionTime === '02:00') {
                    $('#restartConfirmModal').modal('show');
                }
                if (this.sessionTime === '00:00') {
                    setTimeout(async () => {
                        this.clearSessionTime(this.startSession);
                        this.logOut();
                    }, 500);
                }
            }, 1000);
        }
    }

    clearSessionTime(time?: any) {
        clearInterval(time);
        this.startSession = null;
        this.sessionTime = '00:00';
        $('#restartConfirmModal').modal('hide');
        $('#logoutConfirmModal').modal('hide');
    }

    logOut() {
        $('#restartConfirmModal').modal('hide');
        $('#logoutConfirmModal').modal('hide');
        this.authAdminService.isLoggedOut(this.role);
        this.role = '';
    }

    reSignIn() {
        const tokenPayload = {
            displayName: this.displayName,
            refreshToken: this.refreshToken
        }
        console.log('Post payload to get admin reSignIn data isss', tokenPayload);

        this.authAdminService.adminReSignIn(tokenPayload).subscribe(async (response: any) => {
            console.log('Get admin reSignIn data response isss', response);
            if (response && response.success) {
                for (const [key, value] of Object.entries(response.data)) {
                    let newValue: any = value;
                    localStorage.setItem(key, newValue);
                    sessionStorage.setItem(key, newValue);
                }
                setTimeout(() => {
                    clearInterval(this.startSession);
                    this.getSessionTime();
                }, 500);
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

    ngOnDestroy() {
        clearInterval(this.startSession);
        this.startSession = null;
        this.sessionTime = '00:00';
        $('#restartConfirmModal').modal('hide');
        $('#logoutConfirmModal').modal('hide');
    }

}
