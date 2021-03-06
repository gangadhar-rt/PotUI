import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotesComponent } from './project-notes.component';

describe('ProjectNotesComponent', () => {
  let component: ProjectNotesComponent;
  let fixture: ComponentFixture<ProjectNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
