import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  page;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  footerPages(link) {
    this.page = "/" + "" + link;
    if (sessionStorage.userId === undefined) {
      swal("Please Login", "", "warning");
    } else {
      this.router.navigate([this.page]);
    }
  }
  moveUp() {
    window.scrollTo(0, 0);
  }
}
