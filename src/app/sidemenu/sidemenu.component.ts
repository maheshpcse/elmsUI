import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../api-services/auth-user.service';
declare var $: any;

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  public href: any = null;

  constructor(
    public router: Router,
    public authUserService: AuthUserService
  ) { }

  ngOnInit() {
    console.log('current url isss', this.router.url);
    this.href = this.router.url;
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
    });
  }

  setAriaExpandFun() {
    if (this.href === '/apply-leave' || this.href === '/leave-history') {
      return true;
    } else {
      return false;
    }
  }

}
