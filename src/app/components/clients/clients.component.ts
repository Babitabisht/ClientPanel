import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client'
import {ClientService}  from '../../services/client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients:Client[];
  totalOwed:number;
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe(item=>{
      this.clients = item;
     this.getTotalowed();
    })
  }

  getTotalowed(){ 
    const total = this.clients.reduce((total, client)=>{
      return total + parseFloat(client.balance.toString())
    },0)
     this.totalOwed=total;
  }
}
