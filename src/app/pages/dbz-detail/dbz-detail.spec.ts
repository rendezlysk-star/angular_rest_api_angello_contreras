import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbzDetail } from './dbz-detail';

describe('DbzDetail', () => {
  let component: DbzDetail;
  let fixture: ComponentFixture<DbzDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbzDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbzDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
