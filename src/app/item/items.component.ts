import { Component, OnInit } from '@angular/core';
import { AccelerometerData, 
         AccelerometerOptions, 
         startAccelerometerUpdates } from 'nativescript-accelerometer';
import { Observable } from 'rxjs';
import { sampleTime } from 'rxjs/operators';



// import { Item } from './item'
// import { ItemService } from './item.service'

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})


export class ItemsComponent implements OnInit {

  private accelerometer$: Observable<AccelerometerData>;

    public x: number = 0;
    public y: number = 0;
    public z: number = 0;


    public tx: number=0;
    public ty: number=0;


  constructor() {}

  ngOnInit(): void {

    const opts: AccelerometerOptions = {
      sensorDelay: "ui"
    }

    this.accelerometer$ = new Observable((observer) => {
      startAccelerometerUpdates((data: AccelerometerData) => {
          observer.next(data);
      }, opts);
    });

    this.accelerometer$.pipe(sampleTime(200)).subscribe((data) => {

      // this.x = data.x;
      // this.y = - data.y; 
      // this.z = data.z 

      this.x = parseFloat(data.x.toFixed(3));
      this.y = parseFloat(data.y.toFixed(3));
      this.z = parseFloat(data.z.toFixed(3));


      this.tx = (data.x) * 75;
      this.ty = -(data.y) * 75;

     });

  }

  private update(x: number, y: number, z: number){
    this.x = x;
    this.y = y;
    this.z = z;

  }
}
