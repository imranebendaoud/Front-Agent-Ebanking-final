import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteAllComponent } from './compte-all.component';

describe('CompteAllComponent', () => {
  let component: CompteAllComponent;
  let fixture: ComponentFixture<CompteAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
