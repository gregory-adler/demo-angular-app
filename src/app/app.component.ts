import { Component } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "new user";
  exampleForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.formBuilder.group({
      firstName: "",
      lastName: "",
      emailAddress: ""
    });
  }
}
