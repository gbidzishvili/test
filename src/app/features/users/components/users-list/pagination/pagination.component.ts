import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { PaginatorIntlService } from './paginator-intl.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone:true,
  imports: [CommonModule,MatPaginatorModule],
  templateUrl: './pagination.component.html',
  providers:[{provide:MatPaginatorIntl,useClass:PaginatorIntlService}]
})
export class PaginationComponent {
  currentPage = signal(0)
  pageSize = signal(3)
  http = inject(HttpClient)
  usersService = inject(UsersService);
  allUsers = this.getUsersLength()
  public users = this.loadUsers();
  getUsersLength(): Observable<number> {
    return this.http.get('http://localhost:3000/users').pipe(
      map((response: any) => response.length)
    );
  }
  handlePage(pageEvent:PageEvent){
    this.currentPage.set(pageEvent.pageIndex)
    this.pageSize.set(pageEvent.pageSize)
    // console.log("currentPage",this.currentPage(),this.pageSize())
    this.users = this.loadUsers();
  }

  private loadUsers(): Observable<any> {
    const page = this.currentPage();
    const size = this.pageSize();

    console.log(`Loading users for page ${page + 1} with size ${size}`);

    // Adjust API request to use the correct page and page size
    return this.http
      .get(`http://localhost:3000/users?_page=${page + 1}&_per_page=${size}`)
      .pipe(
        tap(response => {
          console.log('Response:', response);
        }),
        map(response => response['data']) // Ensure that you process the response accordingly
      );
  }
}
