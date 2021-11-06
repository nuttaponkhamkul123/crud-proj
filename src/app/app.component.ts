import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Router,NavigationEnd,Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription  } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-proj';
  public routerName! : String
  constructor(private router : Router,){
    this.router.events.subscribe((event:Event) => {
      if(event instanceof NavigationEnd ){
        console.log(event.url);
        this.routerName! = event.url
      }
    });
  }
  ngOnInit() : void{
      console.log(this.router.url)
  }
}
