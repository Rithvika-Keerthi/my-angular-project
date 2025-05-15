import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../Services/authservice.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataset,ChartData } from 'chart.js';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-admincomponent',
  imports: [CommonModule, NgChartsModule,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdmincomponentComponent implements OnInit {
  bookings: any[] = [];
  customers: any[] = [];
  hotels: any[] = [];
  // categories: any[] = [];
  reviews: any[] = [];

  visibleRows: number = 5;  
  totalUsers: number = 0;
  totalHotels: number = 0;
  // totalRoomCategories: number = 0;
  totalAdmins: number = 0;
  totalCustomers: number = 0;
  totalManagers: number = 0;

  // Chart properties
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e5e5',
        },
      },
    },
    elements: {
      bar: {
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false, // Ensures full border rounding
      },
    },
  };
  
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [
    { data: [], label: 'Bookings' }
  ];

  doughnutChartLabels: string[] = ['Pending', 'Confirmed'];
  doughnutChartData: ChartData<'doughnut'> = {
  labels: this.doughnutChartLabels,
  datasets: [
    {
      data: [0, 0],
      backgroundColor: ['#ffc107', '#28a745']
    }
  ]
};
doughnutChartType: ChartType = 'doughnut';

  constructor(private apiService: AuthserviceService,private router:Router) { }

  ngOnInit(): void {
    this.getBookings();
    this.getCustomers();
    this.getHotels();
    // this.getCategories();
    this.getReviews();
    // this.getTotalUsers();
    this.getUsersByRole();

  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  // getTotalUsers(): void {
  //   this.apiService.getTotalUsers().subscribe(response => {
  //     this.totalUsers = response.totalUsers;
  //   });
  // }
  
  getUsersByRole(): void {
    this.apiService.getUsersByRole('Admin').subscribe(admins => {
      this.totalAdmins = admins.length;
    });
    this.apiService.getUsersByRole('Manager').subscribe(data => {
      this.totalManagers= data.length;
    });
  }

  getBookings(): void {
    this.apiService.getBookings().subscribe(data => {
      this.bookings = data;
      console.log('Bookings Data:', this.bookings); // Log the bookings data
      this.generateMonthlyBookingsChart();
      this.generateDoughnutChartData();
    });
    
  }

  seeMore(): void {
    this.visibleRows += 5; // Increase the number of visible rows by 5
  }

  getCustomers(): void {
    this.apiService.getCustomers().subscribe(data => {
      this.customers = data;
      this.totalUsers = data.length;
    });
  }

  getHotels(): void {
    this.apiService.getHotels().subscribe(data => {
      this.hotels = data;
      this.totalHotels = data.length;
    });
  }

  getReviews(): void {
    this.apiService.getReviews().subscribe(data => {
      this.reviews = data;

    //   const ratingsCount = [0, 0, 0, 0, 0]; // Array to store counts for 1-5 stars
    //   this.reviews.forEach(review => {
    //     if (review.rating >= 1 && review.rating <= 5) {
    //       ratingsCount[review.rating - 1]++; // Increment the count for the corresponding rating
    //     }
    //   });
    //   this.ratingsChartData[0].data = ratingsCount;
    // }
  })
  }

  // getCategories(): void {
  //   this.apiService.getCategories().subscribe(data => {
  //     this.categories = data;
  //     this.totalRoomCategories = data.length;
  //   });
  // }

  generateMonthlyBookingsChart(): void {
    const monthlyCounts = Array(12).fill(0);

    this.bookings.forEach(booking => {
      const checkInDate = new Date(booking.checkInDate);
      const month = checkInDate.getMonth(); // 0 = January, 11 = December
      monthlyCounts[month]++;
    });

    this.barChartLabels = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.barChartData[0].data = monthlyCounts;
  }
  openAddManagerForm(): void {
    this.router.navigate(['/app-manager-register']);
}

generateDoughnutChartData(): void {
  const pending = this.bookings.filter(b => b.status === 'Pending').length;
  const confirmed = this.bookings.filter(b => b.status === 'Confirmed').length;

  console.log('Pending:', pending, 'Confirmed:', confirmed); // Log the counts

  // Update the doughnut chart data
  this.doughnutChartData.datasets[0].data = [pending, confirmed];
  // this.cdr.detectChanges(); 
}
}
