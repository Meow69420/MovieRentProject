import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import MovieModel from '../Models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private route: Router) { }

  readonly rootUrl = environment.rootUrl;

  idForEdit: number = NaN;
  dataForEdit!: any;
  list: MovieModel[] = [];
  showPopup: boolean = false;

  addMovie(body: any) {
    return this.http.post(this.rootUrl + "/Movie/Addmovie", body);
  }
  editMovie(body: any) {
    return this.http.put(this.rootUrl + "/Movie/UpdateMovie", body);
  }
  deleteMovie(id: number) {
    return this.http.delete(this.rootUrl + "/Movie/DeleteMovie?id=" + id)
  }
  getSingleMovie(id: number) {
    return this.http.get(this.rootUrl + "/Movie/GetMovie?id=" + id);
  }
  getMovieList() {
    return this.http.get(this.rootUrl + "/Movie/GetAllMovies");
  }
}
