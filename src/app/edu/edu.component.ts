import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-edu',
    templateUrl: './edu.component.html',
    styleUrls: ['./edu.component.css'],
})
export class EduComponent implements OnInit {

    educationForm: FormGroup | any;
    eduArr: any = ['X', 'XII', 'UG', 'PG', 'PHD', 'MPHIL'];
    eduList: any = [];
    imageURL: string | any;
    uploadForm: FormGroup;
    finalArrays: any = [];

    constructor(public fb: FormBuilder) {
        // Reactive Form
        this.uploadForm = this.fb.group({
            avatar: [null],
            name: [''],
        });
    }
    // constructor(private _fb:FormBuilder) { }

    ngOnInit(): void {
        this.educationForm = this.fb.group({
            name: [null],
            education: this.fb.array([this.educationModel()]),
        });

        for (let i = 0; i < 5; i++) {
            this.addEducation();
        }
        for (let k = 0; k < this.eduArr.length; k++) {
            this.educationInfo.controls[k].patchValue({
                qualification_name: this.eduArr[k],
            });
        }
    }

    // Image Preview
    showPreview(event?: any) {
        const file = event.target.files[0];
        this.uploadForm.patchValue({
            avatar: file,
        });
        // this.uploadForm?.get('avatar').updateValueAndValidity();
        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.imageURL = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    handleFileInput(event: any, data?: any) {
        this.finalArrays = [];
        let file = event.target.files;
        // check file
        if (file) {
            //  max 3 files only
            if (event.target.files.length <= 3) {
                let count = event.target.files.length;
                for (let i = 0; i < count; i++) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = (e: any) => {
                        // this.finalArrays.push(e.target.result as File);
                        for (let j = 0; j < this.eduArr.length; j++) {
                            if (data.qualification_name === this.eduArr[j]) {
                                if (i == 0) {
                                    this.educationInfo.controls[j].patchValue({
                                        document_1: e.target.result as File
                                    });
                                } else if (i == 1) {
                                    this.educationInfo.controls[j].patchValue({
                                        document_2: e.target.result as File
                                    });
                                } else if (i == 2) {
                                    this.educationInfo.controls[j].patchValue({
                                        document_3: e.target.result as File
                                    });
                                }
                            }
                        }
                    };
                    reader.onerror = (error: any) => {
                        console.log('Error', error);
                    };
                    // for (let j = 0; j < this.eduArr.length; j++) {
                    //     console.log(data.qualification_name, this.eduArr[j]);
                    //     if (data.qualification_name === this.eduArr[j]) {
                    //         for (let k = 0; k < this.finalArrays.length; k++) {
                    //             this.educationInfo.controls[j].patchValue({
                    //                 document_1:
                    //                     this.finalArrays[0] == null ? null : this.finalArrays[0],
                    //                 document_2:
                    //                     this.finalArrays[1] == null ? null : this.finalArrays[1],
                    //                 document_3:
                    //                     this.finalArrays[2] == null ? null : this.finalArrays[2],
                    //             });
                    //         }
                    //     }
                    // }
                }
            } else {
                alert('Three Documents Only.');
            }
        }
    }

    get educationInfo(): FormArray {
        return this.educationForm.get('education') as FormArray;
    }

    addEducation() {
        this.educationInfo.push(this.educationModel());
    }

    removeEducation(i: number) {
        this.educationInfo.removeAt(i);
    }

    educationModel(): FormGroup {
        return this.fb.group({
            qualification_name: [null],
            course: [null],
            specialization: [null],
            year_of_ompletion: [null],
            grade_percentage: [null],
            institute_university: [null],
            document_1: [null],
            document_2: [null],
            document_3: [null],
        });
    }

    workModel(): FormGroup {
        return this.fb.group({});
    }

    submit() {
        console.log(this.educationForm.value);
    }
}
