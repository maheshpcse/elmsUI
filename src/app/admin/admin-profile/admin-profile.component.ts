import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

    adminData: any = {
        adminId: null,
        fullName: null,
        displayName: null,
        email: null,
        phone: null,
        profile: null,
        role: null,
        status: null,
        lastLogin: null
    };
    readOnly: any = true;

    constructor(
        public router: Router
    ) { }

    ngOnInit() {
        this.adminData = {
            adminId: 1,
            fullName: 'Pachapalam Mahesh',
            displayName: 'Mahesh Pm',
            email: 'maheshpm1599@gmail.com',
            phone: '+91 8886197968',
            profile: `../../../assets/images/admin-avatar.png`,
            role: 'admin',
            status: 1,
            lastLogin: '2022-04-24 09:10:05'
        };
    }

    onEditAction(event?: any) {
        this.readOnly = !event.target.checked;
    }

    viewEmpRequests() {
        this.router.navigate(['/employee-view-requests']);
    }

}
