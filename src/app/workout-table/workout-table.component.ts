import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../material.module';
import { WorkoutService } from '../workout.service';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChartOptions, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-workout-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,BaseChartDirective,CommonModule, MatInputModule, MatSelectModule,FormsModule],
  templateUrl: './workout-table.component.html',
  styleUrl: './workout-table.component.css'
})
export class WorkoutTableComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['userName', 'totalHours', 'numberOfWorkouts','workouts'];
     public barChartLegend = true;
  public barChartPlugins = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    color:"#FFFFF",
    backgroundColor:"#523A92"
  };
  public barChartLabels: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [] ,label:"minutes"}
    ]
  };
  showChart:boolean = false;
  dataSource = new MatTableDataSource<any>();
  searchName: string = '';
  selectedWorkoutType: string = '';
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private workoutService:WorkoutService)  { }
   
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.dataSource.data = this.workoutService.getAllItems('workouts') || [];
 
   this.barChartData.datasets[0].data.push(1)
  }
  getTotalMinutes(workout:any): number {
     let total = 0
  
      workout.workouts.map((workout:any) => {
         total =   total + workout.minutes;
     });
      return total
  }
  toggleShowChart(i:number | null) {
   
    if(i!==null) {
      console.log("true ran")
     this.showChart = true;
     this.showUserChartData(i)
    }else {
      
      this.showChart = false
    }
     
  }
  showUserChartData(index:number) {
     
    const data = this.workoutService.getAllItems("workouts");
    console.log(data[index].userName)
    const separatedData = data[index].workouts.reduce((acc:any, item:any) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item.minutes);
      return acc;
    }, {});
    this.barChartData.datasets[0].data = this.barChartLabels.map(label => separatedData[label] || 0);
    this.chart?.update();
  }
  applyFilter(event: Event | null) {
    let filteredData = this.workoutService.getAllItems('workouts');

    if (event) {
      const target = event.target as HTMLInputElement;
      console.log(target.value)
      let newData = filteredData.filter((item: any) => item.userName.toLowerCase().includes(target.value));
      console.log(newData,"datat")
      this.dataSource.data = newData;
    }

   else {

   
    if (this.selectedWorkoutType) {
      if(this.selectedWorkoutType === "All") {
          let filteredData = this.workoutService.getAllItems('workouts');
               this.dataSource.data = filteredData;
      }else {
  
      let newData:any = [];
 filteredData.map((item: any) => {
 item.workouts.map((workout: any) => {
  if(workout.type===this.selectedWorkoutType) {
      newData.push({id:item.id,userName:item.userName,workouts:[workout]});
    

 }

 })

 }
      );
 
      this.dataSource.data = newData;
      }

    }
      
  
  }
  }

}