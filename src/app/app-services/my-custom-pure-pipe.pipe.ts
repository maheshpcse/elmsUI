import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomPurePipe',
  pure: true
})
export class MyCustomPurePipePipe implements PipeTransform {

  constructor() {
    console.log('MyCustomPurePipe created');
  }

  transform(value: number, ...args: any[]): any {
    console.log(`MyCustomPurePipe#transform called, value ${value}`);
    return value;
  }

}
