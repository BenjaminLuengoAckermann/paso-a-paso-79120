import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name =
    'Benjamin Luengo Ackermann programando desde' + 'Angular ' + VERSION.major;
}
