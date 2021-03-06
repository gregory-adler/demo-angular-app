import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user";

@Component({
  selector: "form-component",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
// Basic Form
@Injectable()
export class FormComponent {
  formComponent = this.fb.group({
    username: [""],
    emailAddress: [""],
    password: [""]
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  // state variables
  askUser = true;
  loaded = false;
  username = "";
  userID = "";
  failed = false;

  onSubmit() {
    this.postUser();
  }

  /** POST: user to docker */
  // url: "http://0.0.0.0:5010/submit/ReceiveUser"
  postUser() {
    return this.http
      .post<String>(
        "http://0.0.0.0:5010/submit/ReceiveUser",
        this.formComponent.value.username +
          "\n" +
          this.formComponent.value.emailAddress +
          "\n" +
          this.formComponent.value.password
      )
      .subscribe(
        //success
        val => {
          console.log("POST call successful value returned in body", val);
          // console.log(val["reasonPhrase"]);
          this.userID = val["reasonPhrase"];
        },
        //error
        response => {
          console.log("POST call in error", response);
          this.returnFailure();
          console.log(response.body);
        },
        // return
        () => {
          console.log("The POST observable is now completed.");
          this.returnSuccess(this.formComponent.value.username, this.userID);
        }
      );
  }

  returnSuccess(a, id) {
    this.askUser = false;
    this.loaded = true;
    this.username = a;
  }
  returnFailure() {
    this.askUser = true;
    this.loaded = false;
    this.failed = true;
  }
}
