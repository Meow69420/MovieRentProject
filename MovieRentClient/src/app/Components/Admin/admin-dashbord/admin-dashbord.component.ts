import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import MovieModel from 'src/app/Models/movie.model';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.css']
})
export class AdminDashbordComponent implements OnInit {
  constructor(public crud: CrudService) { }

  toggleMovieList: boolean = true;

  displayedColumns: string[] = [
    'action',
    'title',
    'description',
    'genre',
    'rating',
    'director',

  ];
  dataSource = [...this.crud.list];


  ngOnInit(): void {
    this.crud.getMovieList()
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          this.dataSource = data.data;
          this.crud.list = data.data;
        }
      })
  }
  @ViewChild(MatTable) table!: MatTable<MovieModel>;

  callEditMovie(id: number) {
    this.crud.idForEdit = id;
    this.showPopupButton();
  }
  callDeleteMovie(id: number) {
    this.crud.deleteMovie(id).subscribe();
    this.table.renderRows();
  }
  showPopupButton() {
    this.crud.showPopup = true;
  }
  toggleMovieListButton() {
    this.toggleMovieList = !this.toggleMovieList;
  }

}
