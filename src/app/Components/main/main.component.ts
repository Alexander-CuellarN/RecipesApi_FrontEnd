import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  status: string = "login"
  
  ngOnInit() {
    // console.log(this.status)
  }

  SignIn($event: string): void {
    this.status = $event
  }

}
