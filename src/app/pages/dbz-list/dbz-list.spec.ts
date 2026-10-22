import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbzList } from './dbz-list';

describe('DbzList', () => {
  let component: DbzList;
  let fixture: ComponentFixture<DbzList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbzList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbzList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
