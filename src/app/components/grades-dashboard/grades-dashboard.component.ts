import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { StudentDetailsService } from 'src/app/services/student-details.service';

@Component({
  selector: 'app-grades-dashboard',
  templateUrl: './grades-dashboard.component.html',
  styleUrls: ['./grades-dashboard.component.scss']
})
export class GradesDashboardComponent implements OnInit {
  chartData = [];
  firstGradeData: any;
  firstGradePassPercent: number;
  secondGradeData: any;
  secondGradePassPercent: number;
  thirdGradeData: any;
  thirdGradePassPercent: number;

  constructor(private _studentDetails: StudentDetailsService,
    private route: Router) { }
  options: EChartsOption = {
    title: {
      text: 'Gradewise Student Perfomance'
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [],
        type: 'pie',
      },
    ],
    tooltip: {}
  };
  ngOnInit(): void {
    this.getChartData();
  }
  getChartData() {
    this._studentDetails.getData().subscribe((data) => {
      // this.chartData = data;
    let subjArr = Object.values(data[0].performance);
    let subjs = [];
    subjArr.forEach(e => subjs.push(e.subject))
    console.log(subjs);
    let formattedData = []; 

    data.forEach(student => {
      let obj = {
        id: student.id,
        name: student.name,
        email: student.email
      };
      subjs.forEach((sub: any) => {
        obj[sub] = student.performance.find(x=>x.subject === sub).score;
      });
      formattedData.push(obj);
    });
    console.log(formattedData);
    
    this.firstGradeData = data.filter(x => x.grade === 1);
    const ffail = this.firstGradeData.filter(x => {
      return x.performance.find(y => y.score < 35);
    });
    this.firstGradePassPercent = ((this.firstGradeData.length - ffail.length) / this.firstGradeData.length) * 100;
    this.chartData.push({name: 'First Grade', value: this.firstGradePassPercent, grade: 1});

    this.secondGradeData = data.filter(x => x.grade === 2);
    const sfail = this.secondGradeData.filter(x => {
      return x.performance.find(y => y.score < 35);
    });
    this.secondGradePassPercent = ((this.secondGradeData.length - sfail.length) / this.secondGradeData.length) * 100;
    this.chartData.push({name: 'Second Grade', value: this.secondGradePassPercent, grade: 2});

    this.thirdGradeData = data.filter(x => x.grade === 2);
    const tfail = this.thirdGradeData.filter(x => {
      return x.performance.find(y => y.score < 35);
    });
    this.thirdGradePassPercent = ((this.thirdGradeData.length - tfail.length) / this.thirdGradeData.length) * 100;

    this.chartData.push({name: 'Third Grade', value: this.thirdGradePassPercent, grade: 3});

    this.options.series[0].data = this.chartData;
    
    });
  }

  onChartClick(event) {
    this.route.navigateByUrl(`${'/gradesDetail/' + event.data.grade}`);
  }
  updateChart() {
    this._studentDetails.scoreChanged.subscribe(data => {
      this.getChartData();
    })
  }
}
