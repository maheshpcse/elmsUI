import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustomImpurePipe',
  pure: false
})
export class MyCustomImpurePipePipe implements PipeTransform {

  constructor() {
    console.log('MyCustomImpurePipe created');
  }

  transform(value: number, ...args: any[]): any {
    console.log(`MyCustomImpurePipe#transform called, value ${value}`);
    return value + value;
  }

}
