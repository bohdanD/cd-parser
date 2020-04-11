import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/services/listing.service';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  pickCity: string;
  pickState: string;
  destCity: string;
  destState: string;

  isTracking: boolean = false;

  latestCar: { carId: number, carModel: string };

  private sub: Subscription;

  constructor(
    private listingService: ListingService,
  ) {
  }

  ngOnInit(): void {
  }

  stop() {
    this.isTracking = false;
    if (this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

  submit() {
    if (this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
    }
    this.sub = interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => {
          return this.listingService.getListings(
            this.pickCity,
            this.pickState,
            this.destCity,
            this.destState
          );
        })
      )
      .subscribe(
        (res: any) => {
          if (Number(res.count)) {
            const carId = res.listings[0].vehicleData[0].vehicle_id;
            const carModel = `${res.listings[0].vehicleData[0].make} ${res.listings[0].vehicleData[0].model}`;

          if (carId !== this.latestCar.carId) {
            new Notification(
              `New car: ${carModel}; Price: ${res.listings[0].price}`,
              {
                icon: 'assets/img/centraldispatchlogo.png',
                
              }
            )
          }

          this.latestCar = { carId, carModel };
          console.log(this.latestCar);
          } else {
            new Notification('No cars found');
          }
          
          this.isTracking = true;
        },
        (err) => {
          console.log(err);
          this.isTracking = false;
        }
      );
  }

}
