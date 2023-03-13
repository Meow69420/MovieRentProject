import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import MovieModel from 'src/app/Models/movie.model';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  constructor(public crud: CrudService) { }

  toggleMovieList: boolean = true;

  displayedColumns: string[] = [
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

  toggleMovieListButton() {
    this.toggleMovieList = !this.toggleMovieList;
  }
}
