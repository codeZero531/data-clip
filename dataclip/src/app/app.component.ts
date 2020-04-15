import {AfterViewInit, Component, OnDestroy} from "@angular/core";
import {Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadingIndicator: boolean;
  title = 'dataclip';

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof  NavigationStart) {
        // console.log('loading');
        this.loadingIndicator = true;

      }
      if (routerEvent instanceof  NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError
      ) {
        // console.log('stop loading');
        this.loadingIndicator = false;
      }

    });

  }

}
