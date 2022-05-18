import { AfterContentChecked, AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from '../api-services/auth-user.service';
import { Observable, Subscription, range, interval, of } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { take, map } from 'rxjs/operators';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

    newSubscription: Subscription;

    originalValue: any = 'Casual Leave';
    newValue: any = null;

    number1: any = 1;
    number2: any = 2;

    // time: any = new Observable((observer: any) => {
    //   setInterval(() => observer.next(new Date().toString()), 1000);
    // });

    isSearch: any = false;

    imageFile: any = null;
    @ViewChild('fileName', { static: false }) fileNameRef: ElementRef;
    filesArray: any = [];

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authUserService: AuthUserService
    ) {
        console.log('called constructor()');
    }

    ngOnInit() {
        console.log('called ngOnInit()');

        // example 1
        // const source = range(1, 5);
        // Create observer object
        // const myObserver = {
        //   next: x => console.log('Observer got a next value: ' + x),
        //   error: err => console.error('Observer got an error: ' + err),
        //   complete: () => console.log('Observer got a complete notification'),
        // };
        // Execute with the observer object and Prints out each item
        // source.subscribe(myObserver);

        // example 2
        // const observable = new Observable(observer => {
        //   setTimeout(() => {
        //     observer.next('Hello from a Observable!');
        //   }, 2000);
        // });
        // observable.subscribe(value => {
        //   console.log('value isss', value);
        // });

        // example 3
        // const numbers = interval(1000);
        // const takeThree = numbers.pipe(take(3),
        //   map((v) => Date.now())
        // );
        // takeThree.subscribe(value => console.log("Subscriber: " + value));

        // example 4
        // const nums = [1,2,3,4,5,6];
        // const obj = {
        //   name: 'RSK',
        //   gender: 'Male'
        // };
        // let nameArr = ['Chiru', 'Nag', 'Venky', 'Balaiah'];
        // let obs = of(25, nums, obj, 'RSK Helpline', nameArr, {});

        // obs.subscribe(data => {
        //   console.log(data);
        // });

        // setTimeout(() => {
        //   obs.subscribe(data => {
        //     console.log(data);
        //   });
        // }, 4000);

        // const sequence = new Observable(this.multiCastSubscriber());

        // sequence.subscribe({
        //   next(num: any) {
        //     console.log('1st subscriber: '+ num);
        //   },
        //   complete() {
        //     console.log('1st Finished.');
        //   }
        // });

        // setTimeout(() => {
        //   sequence.subscribe({
        //     next(num: any) {
        //       console.log('2nd subscriber: '+ num);
        //     },
        //     complete() {
        //       console.log('2nd Finished.');
        //     }
        //   });
        // }, 3000);

        // this.newSubscription = this.route.params.subscribe(async (data: any) => {
        //   console.log('Get params data isss', data);
        // }, (error: any) => {
        //   console.log('error while getting params data');
        // });

        // this.authUserService.getServerStatus().subscribe(async (response: any) => {
        //   console.log('Get server response isss', response);
        // }, (error: any) => {
        //   console.log('error while getting server response');
        // });
    }

    multipleSubscriber() {
        const arr = [10, 20, 30, 40, 50, 60];
        return (observer: any) => {
            this.run(observer, arr, 0);
            return {
                unsubscribe() { }
            }
        }
    }

    run(observer: any, arr: any, index: any) {
        return setTimeout(() => {
            observer.next(arr[index]);
            if (index == arr.length - 1) {
                observer.complete();
            } else {
                this.run(observer, arr, ++index);
            }
        }, 1000);
    }

    multiCastSubscriber() {
        const arr = [100, 200, 300, 400, 500];
        const observers = [];
        let timeoutId: any = 0;
        return (observer: any) => {
            observers.push(observer);
            if (observers.length === 1) {
                timeoutId = this.run(
                    {
                        next(val: any) {
                            observers.forEach(obs => obs.next(val));
                        },
                        complete() {
                            observers.slice(0).forEach(obs => obs.complete());
                        }
                    },
                    arr,
                    0
                );
                return {
                    unsubscribe() {
                        observers.splice(observers.indexOf(observer), 1);
                        if (observers.length == 0) {
                            clearTimeout(timeoutId);
                        }
                    }
                }
            }
        }
    }

    changeValue() {
        this.originalValue = this.newValue;
    }

    resetValue() {
        this.originalValue = 'Casual Leave';
        this.newValue = null;
    }

    openSearch() {
        this.isSearch = !this.isSearch;
        let ipSearchEle: any = document.getElementById('searchnameid') as SafeHtml;
        console.log('ipSearchEle isss', ipSearchEle);
        if (this.isSearch) {
            ipSearchEle.style['visibility'] = "visible";
            ipSearchEle.style['width'] = "100%";
            ipSearchEle.style['transition'] = "width 1.5s";
        } else {
            ipSearchEle.style['visibility'] = "hidden";
            ipSearchEle.style['width'] = "0%";
            ipSearchEle.style['transition'] = "width 1.5s";
        }
    }

    ngOnDestroy() {
        console.log('called ngOnDestroy()');
        if (this.newSubscription) {
            this.newSubscription.unsubscribe();
        }
    }


    onSelectFiles(event: any) {
        console.log('Selected file event isss', event);
        this.imageFile = event.target.files[0] as File;

        // for single file
        // this.filesArray = [];
        // const file = event.target.files[0] as File;
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        //   console.log('base64 image data isss', reader.result);
        //   this.filesArray.push(reader.result);
        // };
        // reader.onerror = (error: any) => {
        //   console.log('Error: ', error);
        // };

        // for multiple files
        this.filesArray = [];
        const files = event.target.files;
        for (const item of files) {
            const file = item as File;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.filesArray.push(reader.result);
            };
        }

        console.log('Final filesArray isss:', this.filesArray);
    }
}
