import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincomponentComponent } from './admin-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: AdmincomponentComponent;
  let fixture: ComponentFixture<AdmincomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmincomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
