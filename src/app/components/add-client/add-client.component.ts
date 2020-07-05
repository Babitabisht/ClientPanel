import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnAdd: boolean = false;
  @ViewChild('clientForm') form: any;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {}

  onSubmit({ value, valid }: { value: Client; valid: Boolean }) {
    console.log('clientForm', value, valid);
    if (!valid) {
            this._flashMessagesService.show('Form is not valid!', {
              cssClass: 'alert-danger',
              timeout: 1000,
            });
    } else {
            this.clientService.addClients(value);
            this._flashMessagesService.show('Saved Successfully!', {
              cssClass: 'alert-success',
              timeout: 1000,
            });
            this.router.navigate(['/'])
    }
  }
}
