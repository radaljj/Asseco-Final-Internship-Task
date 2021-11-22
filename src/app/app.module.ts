import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TransactionsComponent } from './transactions/transactions.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { ChartsModule } from 'ng2-charts';
import { MyTableComponent } from './my-table/my-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSimpleSidebarModule } from 'ng-simple-sidebar';
import {SidenavModule} from 'angular-ng-sidenav';
import { HttpClientModule } from '@angular/common/http';
import { TransactionService } from './transaction.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { SplitComponent } from './split/split.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    MyTableComponent,
    DialogComponent,
    SplitComponent,
    ChartComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    NgSimpleSidebarModule,
    MatTabsModule,
    SidenavModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    ChartsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatButtonToggleModule,
    NgApexchartsModule,
    LayoutModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatChipsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
