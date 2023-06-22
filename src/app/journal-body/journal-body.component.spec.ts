import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalBodyComponent } from './journal-body.component';

describe('JournalBodyComponent', () => {
  let component: JournalBodyComponent;
  let fixture: ComponentFixture<JournalBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
