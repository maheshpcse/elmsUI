import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../api-services/auth-user.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public href: any = null;

  constructor(
    public router: Router,
    public authUserService: AuthUserService
  ) { }

  ngOnInit() {
    console.log('current url isss', this.router.url);
    this.href = this.router.url;
  }

  onToggleSideNav() {
    $('#sidebarCollapse').toggleClass('active');
  }

}
