import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'centraldispatch-parser';

  constructor(
  ) {}

  ngOnInit() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  
  }

}
