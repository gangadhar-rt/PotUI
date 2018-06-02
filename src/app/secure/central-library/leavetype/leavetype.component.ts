import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService, FormsValidationService } from '../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.less'],
  providers: [ApiService]
})
export class LeavetypeComponent implements OnInit {

  togggled: any = false;
  List: any;
  selectedlist = [];
  mStatus = '';
  saveDeps: any;
  Leave_creation: FormGroup;
  Isedit = false;
  records = 10;
  request = { 'status': '1' };

  constructor(private fb: FormBuilder, private _service: ApiService, private _route: Router) {
    this.resetForm();
  }
  resetForm() {
    this.Leave_creation = this.fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required],
      'reqform': ['', Validators.nullValidator],
      'medicalform': ['', Validators.nullValidator],
      'applicablefor': ['', Validators.required],
      'maxnoofdays': [null, Validators.required],
      'category': ['', Validators.required]
    });
  }
  getServiceClassification() {
    this._service.PostService(this.request, '/projectlib/getProjLeaveTypes')
      .subscribe(
        data => {
          this.List = data.projLeaveTypeTOs;
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
      const index = this.selectedlist.map(function (e) { return e.mesaurement_code; }).indexOf(code.mesaurement_code);
      this.selectedlist.splice(index, 1);
    }
  }
  ngOnInit() {
    this.getServiceClassification();
  }
  CreateNew() {
    this.resetForm();
    const request = { 'status': 1 };
    this._service.PostService(request, '/projectlib/projLeaveTypeifOnLoad')
      .subscribe(
        data => {
          this.saveDeps = data;
          $('.modal').modal('show');
        },
        error => console.log(error),
        () => console.log('call Sussessful')
      );
  }
  edit() {
    this.Isedit = true;
    this.Leave_creation = this.fb.group({
      'code': [this.selectedlist[0].code, Validators.required],
      'name': [this.selectedlist[0].name, Validators.required],
      'reqform': [this.selectedlist[0].reqform, Validators.nullValidator],
      'medicalform': [this.selectedlist[0].medicalForm, Validators.nullValidator],
      'applicablefor': [this.selectedlist[0], Validators.required],
      'maxnoofdays': [this.selectedlist[0].maxallowdays, Validators.required],
      'category': [this.selectedlist[0].projEmpCatgId, Validators.required]
    });
    const request = { 'status': 1 };
    this._service.PostService(request, '/projectlib/projLeaveTypeifOnLoad')
      .subscribe(
        data => {
          this.saveDeps = data;
          $('.modal').modal('show');
        },
        error => console.log(error),
        () => console.log('call Sussessful')
      );
  }
  saveDetails() {
    let request: any;
    if (this.Isedit) {
      request = {
        'projLeaveTypeTos':
          [{
            'clientId': null, 'clientCode': null, 'status': 1, 'id': this.selectedlist[0].id, 'projId': null,
            'code': this.Leave_creation.value.code, 'name': this.Leave_creation.value.name,
            'reqform': this.Leave_creation.value.reqform, 'medicalForm': this.Leave_creation.value.medicalform,
            'projEmpCatgId': this.Leave_creation.value.category, 'costCodeId': null,
            'maxallowdays': this.Leave_creation.value.maxnoofdays, 'projLeavePayId': this.Leave_creation.value.applicablefor,
            'projCostItemTO': {
              'clientId': null, 'clientCode': null, 'status': 1, 'projId': null, 'code': null,
              'name': null, 'parentCode': null, 'parentName': null, 'id': null, 'item': false,
              'itemParent': false, 'expand': false, 'parentId': null, 'startDate': null, 'finishDate': null,
              'workdairyEntry': false, 'comments': null, 'costId': null, 'select': null, 'costCodeTO': null, 'projCostCodeItemTOs': []
            },
            'projLeavePaidCatgTO': this.saveDeps.projLeavePaidResp.projLeavePaidCatgTOs.filter(it => {
              return it.id == this.Leave_creation.value.applicablefor;
            })[0],
            'projEmpCatgTO': this.saveDeps.projEmpTypeResp.projEmpCatgTOs.filter(it => {
              return it.id == this.Leave_creation.value.category;
            })[0]
          }]
      };
    } else {
      request = {
        'projLeaveTypeTos':
          [{
            'clientId': null, 'clientCode': null, 'status': 1, 'id': null, 'projId': null,
            'code': this.Leave_creation.value.code, 'name': this.Leave_creation.value.name,
            'reqform': this.Leave_creation.value.reqform, 'medicalForm': this.Leave_creation.value.medicalform,
            'projEmpCatgId': this.Leave_creation.value.category, 'costCodeId': null,
            'maxallowdays': this.Leave_creation.value.maxnoofdays, 'projLeavePayId': this.Leave_creation.value.applicablefor,
            'projCostItemTO': {
              'clientId': null, 'clientCode': null, 'status': 1, 'projId': null, 'code': null,
              'name': null, 'parentCode': null, 'parentName': null, 'id': null, 'item': false,
              'itemParent': false, 'expand': false, 'parentId': null, 'startDate': null, 'finishDate': null,
              'workdairyEntry': false, 'comments': null, 'costId': null, 'select': null, 'costCodeTO': null, 'projCostCodeItemTOs': []
            },
            'projLeavePaidCatgTO': this.saveDeps.projLeavePaidResp.projLeavePaidCatgTOs.filter(it => {
              return it.id == this.Leave_creation.value.applicablefor;
            })[0],
            'projEmpCatgTO': this.saveDeps.projEmpTypeResp.projEmpCatgTOs.filter(it => {
              return it.id == this.Leave_creation.value.category;
            })[0]
          }]
      };

    }
    this._service.PostService(request, '/projectlib/saveProjLeaveTypes')
      .subscribe(
        data => {
          console.log(data);
          this.Leave_creation.reset();
          this.List = data.projLeaveTypeTOs;
          $('.modal').modal('hide');
        }
      );
  }
  reset() {
    this.request = { 'status': '1' };
    this.getServiceClassification();
  }
  deactive() {
    const req = { 'projLeaveTypeIds': this.selectedlist.map((data) => data.id), 'status': 2 };
    this._service.PostService(req, '/projectlib/deleteProjLeaveTypes')
      .subscribe((data) => {
        this.selectedlist = [];
        this.getServiceClassification();
      },
        (error) => {
          alert('deactive failed');
        });
  }
}
