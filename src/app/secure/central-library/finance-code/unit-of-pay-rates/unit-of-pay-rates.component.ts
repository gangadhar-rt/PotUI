import { Component, OnInit } from '@angular/core';
import { ApiService, SettingsService } from '../../../../shared';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
@Component({
  selector: 'app-unit-of-pay-rates',
  templateUrl: './unit-of-pay-rates.component.html',
  styleUrls: ['./unit-of-pay-rates.component.less'],
  providers: [ApiService]
})
export class UnitOfPayRatesComponent implements OnInit {
  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  records = 10;
  constructor(private _service: ApiService, private _route: Router) { }
  getEmployeeClassification() {
    let request = { "empCode": null, "empName": null, "status": "1" };
    this._service.PostService(request, '/finance/getUnitOfRates')
      .subscribe(
      data => {
        this.List = data.unitPayRateTOs;
        this.List.forEach(element => {
          element.checked = false;
        });
      },
      error => console.log(error),
      () => console.log('call Sussessful')
      );
  }
  viewRecord(record) {
    record = JSON.stringify(record);
    alert(record);
  }

  selectedRecords(code, e) {
    e.stopPropagation();
    code.checked = !code.checked;
    if (code.checked) {
      this.selectedlist.push(code);
    } else {
      var index = this.selectedlist.map(function (e) { return e.mesaurement_code; }).indexOf(code.mesaurement_code);
      this.selectedlist.splice(index, 1)
    }
  }
  ngOnInit() {
    this.getEmployeeClassification();
  }
}
