import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Router,NavigationEnd,Event, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription  } from 'rxjs';
import { map } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-proj';
  public routerName! : String
  constructor(private router : Router,private route : ActivatedRoute){
    router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        let route = event.state.root.firstChild;
        this.routerName! =  route?.data['title'];
      }
    });
  }
  ngOnInit() : void{
    
  }
}
