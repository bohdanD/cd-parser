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

  token: string = '0fa298e973bb6c4e52b8aac2d6455de7279a174226b355db28a41b4bed01ca78';
  sessid: string = '134347488f17b604c3e8bff60363d928';
  cookie: string = 'PHPSESSID=9578ac510a80bed7bee97fa5f8879326; test-session=1; CSRF_TOKEN=4209690b06efe647d15006e0f3b204e32bfee8b804cecf2cc23679ef4d6c13b0; visitedDashboard=1; bm_mi=E846A7F45CD84C7C31301C34F4D8B5A6~5bh1PfIhJFHGGL+MOCYB2hNRbK30/2EmWi0828oTaTGx9hP5QIkcE373bZpKigRCX3SyIW/K5dsCPinI/mGv2WEuJqXL69MuOU6oVYIj8zhrtVH2HgRpySZf87a9cQzMj3wui2hJbO5qhfmSMB+iMZEdtN9ivmzjJi7O9AqGDgW2lTdHcJCQSXVDMw2IU9+KwlcKT4NY8KkyYInGw4JCCFzrQq86wh5VPtZ8YQeFBK2Jpy33ebOdPqfPt+8++oX9k4vypGYQUj7HNJ18QL4E/Ve4AKVS1xIMWcYQwUQ4Shs=; _ga=GA1.1.168095745.1586595847; _gid=GA1.1.1766872811.1586595847; ak_bmsc=4D830C3EF5533F995FDB2D5A3A22972A6855F935F36F0000EC87915E4EF0182C~plqeBbycrqSCbBlB2v+NxnVOT78j0jKbipKxJdqiFyq+Js9HG9c4znyXmuTY3LPsG2pGwJ7EpwC5aixC9DBK/4zq4HkpLt0UP76DsLZOM5BDfh1d1055LHT3j1Viz+SKwRD/zwO3STxOFyLzoa6mXl7vn/jRmM1Ru1F8moVp0fwurCkj5swmUS2ma9bzWynIdD6mUP92io9l0fKRviQYPKd2Qjmsd4YN1RKGV8FrCzINhbJHCd99Zxn1bEMqz/EFIQ; defaultView=list; QSI_HistorySession=https%3A%2F%2Fwww.centraldispatch.com%2Fprotected%2F~1586595847705%7Chttps%3A%2F%2Fwww.centraldispatch.com%2Fprotected%2Flisting-search~1586595875521%7Chttps%3A%2F%2Fwww.centraldispatch.com%2Fprotected%2Flisting-along-route%2Fresult%3FrouteBased%3D0%26corridorWidth%3D0%26routePickupCity%3D%26routePickupState%3D%26routePickupZip%3D%26route_origination_valid%3D1%26routeDeliveryCity%3D%26routeDeliveryState%3D%26routeDeliveryZip%3D%26route_destination_valid%3D1%26waypointCity%255B%255D%3D%26waypointCity%255B%255D%3D%26waypointCity%255B%255D%3D%26waypointCity%255B%255D%3D%26waypointCity%255B%255D%3D%26waypointState%255B%255D%3D%26waypointState%255B%255D%3D%26waypointState%255B%255D%3D%26waypointState%255B%255D%3D%26waypointState%255B%255D%3D%26waypointZip%255B%255D%3D%26waypointZip%255B%255D%3D%26waypointZip%255B%255D%3D%26waypointZip%255B%255D%3D%26waypointZip%255B%255D%3D%26waypoint_valid%3D1%26pickupCity%3DChicago%26pickupRadius%3D100%26pickupState%3DIL%26pickupZip%3D%26pickupAreas%255B%255D%3DAll%26origination_valid%3D1%26deliveryCity%3DNewark%26deliveryRadius%3D100%26deliveryState%3DNJ%26deliveryZip%3D%26deliveryAreas%3D%26destination_valid%3D1%26FatAllowCanada%3D1%26vehicleTypeIds%255B%255D%3D%26trailerType%3D%26vehiclesRun%3D%26minVehicles%3D1%26maxVehicles%3D%26shipWithin%3D1%26paymentType%3D%26minPayPrice%3D250%26minPayPerMile%3D0.40%26highlightOnTop%3D1%26postedBy%3D%26highlightPeriod%3D4%26listingsPerPage%3D100%26primarySort%3D9%26secondarySort%3D4%26filterBlocked%3D1%26CSRFToken%3D4209690b06efe647d15006e0f3b204e32bfee8b804cecf2cc23679ef4d6c13b0%26highlightPreferred%3D1%26pickupCitySearch%3D1%26deliveryCitySearch%3D1~1586596234794; bm_sv=F5235472C6643DACDD5ACBCB26506F16~3g4eCb/mb/H6ZWrAtrfQF0cwU6v4JlKViCTXF2oEsr5bOeGbcN9jTruFCpGI2l8lAmy36EqPDKrEYx/mhxVyTPZUGWxwPewubVAOerU17jQRv/FcCXDinhGldsDnBAACSLq1iR4iD2N/ASwZeejEwJxlHxKLeoltzwStFTpfZW4=; _uiq_id.705106101.8c7c=44f3b8933ebdec29.1586595847.0.1586597440..; _gat_UA-128124542-1=1';

  isTracking: boolean = false;
  showAuthData: boolean = false;

  latestCar: { carId: number, carModel: string } = { carId: 0, carModel: null };

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
    this.sub = interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => {
          return this.listingService.getListings(
            this.pickCity,
            this.pickState,
            this.destCity,
            this.destState,
            this.token,
            this.sessid,
          );
        })
      )
      .subscribe(
        (res: any) => {
          if (Number(res.count)) {
            const latest = this.findLatest(res.listings);
            const carId = latest.vehicleData[0].vehicle_id;
            const carModel = `${latest.vehicleData[0].make} ${latest.vehicleData[0].model}`;

            if (carId !== this.latestCar.carId) {
              new Notification(
                `New car: ${carModel}; Price: ${latest.price}`,
                {
                  icon: 'assets/img/centraldispatchlogo.png',
                }
              )
            }

            this.latestCar = { carId, carModel };
            console.log(this.latestCar);
          } else {
            console.log('No cars found');
          }

          this.isTracking = true;
        },
        (err) => {
          console.log(err);
          this.isTracking = false;
        }
      );
  }

  private findLatest(listings: any[]) {
    const greenZone = listings.filter(l => l.newListing);
    if (greenZone.length) {
      greenZone.sort((a, b) => {
        const idA = Number(a.listingId);
        const idB = Number(b.listingId);

        return idB - idA;
      });

      return greenZone[0];
    }

    return listings[0];
  }

}
