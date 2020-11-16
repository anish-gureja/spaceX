import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-space-launch',
  templateUrl: './space-launch.component.html',
  styleUrls: ['./space-launch.component.scss']
})
export class SpaceLaunchComponent implements OnInit {
  years = [2006]; // 2006 is the inital year
  currentYear = new Date().getFullYear();
  spaceDetails: any;
  selectedYear: number;
  launchSuccess: boolean;
  landSuccess: boolean;
  foundDetails: boolean = false;
  message: string;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    for (let i = 1; this.years[i - 1] < this.currentYear; i++)
      this.years.push(this.years[i - 1] + 1);

    this.route.queryParams.subscribe(params => {
      if (params != null) {
        this.selectedYear = params.launch_year != null ? params.launch_year : '';
        this.landSuccess = params.land_success != null ? params.land_success : '';
        this.launchSuccess = params.launch_success != null ? params.launch_success : '';
      }
    })
    this.getSpaceData();
  }

  getSpaceData() {
    this.spaceDetails = [];
    this.foundDetails = false; this.message = '';
    let spaceUrl = `https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${this.selectedYear}&launch_success=${this.launchSuccess}&land_success=${this.landSuccess}`;
    this.http.get<Observable<any>>(spaceUrl).subscribe(val => {
      this.spaceDetails = val; this.foundDetails = true;
      this.message = this.spaceDetails.length == 0 ? "No Launch Found" : '';
    }, error => { this.foundDetails = true; this.message = "Internal Error"; });

  }

  launchFilter() {
    this.router.navigate(['spaceX'], { queryParams: { launch_year: this.selectedYear, launch_success: this.launchSuccess, land_success: this.landSuccess } });
    this.getSpaceData();
  }

  isActive(url) {
    return this.router.url.includes(url);
  }
}
