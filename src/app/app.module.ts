import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GradesDashboardComponent } from './components/grades-dashboard/grades-dashboard.component';
import { GradesDetailComponent } from './components/grades-detail/grades-detail.component';
import { StudentDetailsService } from './services/student-details.service';

@NgModule({
  declarations: [
    AppComponent,
    GradesDashboardComponent,
    GradesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [StudentDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
