import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/Helpers/ValidateFrom';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  constructor(
    private crud: CrudService,
    private fb: FormBuilder
  ) { }
  addEditForm!: FormGroup;
  inputButton: string = 'ADD';

  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      id: 0,
      title: "",
      genre: "",
      rating: "",
      description: "",
      director: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z][A-Za-z ]*[A-Za-z]$")])],
    })
    if (this.crud.idForEdit) {
      this.populateEditForm();
      this.inputButton = 'UPDATE'
    }
  }
  onSubmit() {
    if (this.addEditForm.valid) {
      if (!this.crud.idForEdit) {
        this.crud.addMovie(this.addEditForm.value)
          .subscribe(
            (data: any) => {
              this.addEditForm.reset();
              this.crud.showPopup = false;
            }
          )
      } else {
        this.crud.editMovie(this.addEditForm.value)
          .subscribe(
            () => {
              this.addEditForm.reset();
              this.crud.showPopup = false;
              this.inputButton = 'ADD';
            }
          )
      }
    } else {
      ValidateForm.validateAllFormFields(this.addEditForm);
    }
  }
  populateEditForm() {
    this.crud.getSingleMovie(this.crud.idForEdit)
      .subscribe(
        (data: any) => {
          this.crud.dataForEdit = data;
          console.log(data);
          this.addEditForm.controls['id'].setValue(data.data.id);
          this.addEditForm.controls['title'].setValue(data.data.title);
          this.addEditForm.controls['genre'].setValue(data.data.genre);
          this.addEditForm.controls['rating'].setValue(data.data.rating);
          this.addEditForm.controls['description'].setValue(data.data.description);
          this.addEditForm.controls['director'].setValue(data.data.director);
        }
      )
  }
  closePopup() {
    this.crud.showPopup = false;
    this.crud.idForEdit = NaN;
  }
}

