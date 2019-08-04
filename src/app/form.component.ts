import { Component } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user";

@Component({
  selector: "form-component",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
@Injectable()
export class FormComponent {
  formComponent = this.fb.group({
    firstName: [""],
    lastName: [""],
    emailAddress: [""]
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  onSubmit() {
    // create user
    var testUser = new User(
      this.formComponent.value.firstName,
      this.formComponent.value.lastName,
      this.formComponent.value.emailAddress
    );

    this.postUser("string");
  }

  /** POST: add a user to the docker */
  postUser(a) {
    console.log("http://0.0.0.0:5010/submit/ReceiveUser");
    // https://localhost:5009/submit/ReceiveUser

    return this.http
      .post<String>(
        "http://0.0.0.0:5010/submit/ReceiveUser",
        this.formComponent.value.firstName +
          "\n" +
          this.formComponent.value.lastName +
          "\n" +
          this.formComponent.value.emailAddress
      )
      .subscribe(
        val => {
          console.log("POST call successful value returned in body", val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        }
      );
  }
}
