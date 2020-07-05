import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id: String;
  client: Client;

  showBalanceUpdateInput: boolean = false;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((data) => {
      this.client = data;
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: Boolean }) {
    console.log('clientForm', value, valid);
    if (!valid) {
      this._flashMessagesService.show('Form is not valid!', {
        cssClass: 'alert-danger',
        timeout: 1000,
      });
    } else {
      value.id=this.id.toString();
      this.clientService.updateClient(value);
      this._flashMessagesService.show('Edited Successfully!', {
        cssClass: 'alert-success',
        timeout: 3000,
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }
}
