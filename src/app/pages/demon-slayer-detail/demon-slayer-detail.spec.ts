import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonSlayerDetail } from './demon-slayer-detail';

describe('DemonSlayerDetail', () => {
  let component: DemonSlayerDetail;
  let fixture: ComponentFixture<DemonSlayerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemonSlayerDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemonSlayerDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
