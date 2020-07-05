import { Component, OnInit } from '@angular/core';
import {Client} from  '../../models/client';
import { ClientService} from '../../services/client.service';
import {Router,ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  id: String;
  client: Client;
  hasBalance: boolean = false;
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
      if (data != null) {
        if (data.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = data;
    });
  }

  onDeleteClick(id:String) {
      this.clientService.deleteClient(this.client);
     this._flashMessagesService.show('Removed Successfully!', {
       cssClass: 'alert-danger',
       timeout: 3000,
     });
     this.router.navigate(['/']);
  }

  updateBalance(id:String){
    this.clientService.updateClient(this.client)
     this._flashMessagesService.show('Saved Successfully!', {
       cssClass: 'alert-success',
       timeout: 3000,
     });
    //  this.router.navigate(['/']);
  }
}