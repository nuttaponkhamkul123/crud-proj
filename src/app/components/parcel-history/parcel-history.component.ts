import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-parcel-history',
  templateUrl: './parcel-history.component.html',
  styleUrls: ['./parcel-history.component.css']
})
export class ParcelHistoryComponent implements OnInit , OnDestroy {
  destroy$ = new Subject<void>();
  constructor(private route : ActivatedRoute) { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(param => {
      console.log('param : ' , param);
    })
  }

}
