import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from './api-services/auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'elmsUI';

    showQuestion: any = `Is content projection cool?`;
    showAnswer: any = `Yes, It is the one.`;
    questions: any = null;
    tempQuestions: any = 'Is content projection cool?';

    constructor(
        public router: Router,
        public authUserService: AuthUserService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
    }

    changeValue() {
        this.showQuestion = this.questions;
    }

    resetValue() {
        this.showQuestion = this.tempQuestions;
        this.questions = null;
    }
}
