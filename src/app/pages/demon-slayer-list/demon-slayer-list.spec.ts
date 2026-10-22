import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonSlayerList } from './demon-slayer-list';

describe('DemonSlayerList', () => {
  let component: DemonSlayerList;
  let fixture: ComponentFixture<DemonSlayerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemonSlayerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemonSlayerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
