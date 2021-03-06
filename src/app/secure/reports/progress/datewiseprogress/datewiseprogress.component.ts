import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/index';


@Component({
  selector: 'app-datewiseprogress',
  templateUrl: './datewiseprogress.component.html',
  styleUrls: ['./datewiseprogress.component.less'],
  providers: [ApiService]

})
export class DatewiseprogressComponent implements OnInit {

  getpop = false;
  request: any = { project: '', eps: '', id: 0 };

  constructor(private _service: ApiService) { }

  ngOnInit() {
  }
  updateValues(e) {
    this.getpop = false;
    this.request = { project: e.selectedProj.projName, eps: e.selectedProj.parentName, id: e.selectedProj.projId }
  }
}