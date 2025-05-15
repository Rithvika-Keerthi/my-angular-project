import { Routes } from '@angular/router';
import { RecentBookingsComponent } from './Components/recentbookings/recentbookings.component';
import { BookingScreenComponent } from './Components/booking-screen/booking-screen.component';
import { RoomCardsComponent } from './Components/room-cards/room-cards.component';
import { HomeComponent } from './Components/home/home.component';
// import { LoginPageComponent } from './Components/login-page/login-page.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HotelCardDisplayComponent } from './Components/hotel-card-display/hotel-card-display.component';
import { HotelSearchComponent } from './Components/hotel-search-form/hotel-search-form.component';
import { BookingFormComponent } from './Components/booking-form/booking-form.component';
import { FilterComponent } from './Components/filter/filter.component';
import { AuthGuard } from './Services/auth.guard';
import { AdmincomponentComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './Services/admin.guard';
import { LoginComponent } from './Components/login/login.component';
import { BookingStatusComponent } from './Components/booking-status/booking-status.component';
import { ManagerRegisterComponent } from './Components/manager-register/manager-register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/hotels', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // { path: 'login', component: LoginPageComponent },
    {path:'app-login',component: LoginComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'hotels', component: HotelCardDisplayComponent },
    
    { 
      path: 'search', 
      component: HotelSearchComponent,
      canActivate: [AuthGuard]
    },
    { 
      path: 'booking/:hotelId/:roomId', 
      component: BookingFormComponent,
      canActivate: [AuthGuard]
    },
    { path: 'booking-status/:hotelId/:roomId', component: BookingStatusComponent },  // ✅ Unique route name
    { path: 'filter', component: FilterComponent },  // ✅ Standardized naming
    { path: 'rooms/:id', component: RoomCardsComponent },
    { path: 'app-booking-screen', component: BookingScreenComponent },
    { 
      path: 'profile/recent-bookings', 
      component: RecentBookingsComponent,
      title: 'Recent Bookings'
    },
    {
      path: 'app-admincomponent',
      component: AdmincomponentComponent,
      
    },
    {
      path:'app-manager-register',
      component:ManagerRegisterComponent
    }

];
