import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRowComponent } from './book-row.component';

describe('BookRowComponent', () => {
  let component: BookRowComponent;
  let fixture: ComponentFixture<BookRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
