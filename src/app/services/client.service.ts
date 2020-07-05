import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import {Client} from '../models/client'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  ClientDoc: AngularFirestoreDocument<Client>;
  Clients: Observable<Client[]>;
  Client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = afs.collection<Client>('clients');
  }

  getClients(): Observable<Client[]> {
    return this.clientsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addClients(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: String): Observable<Client> {
    this.ClientDoc = this.afs.doc<Client>(`clients/${id}`);
    return this.ClientDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists == false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
  }

  updateClient(client: Client) {
    this.ClientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.ClientDoc.update(client);
  }

  deleteClient(client: Client) {
    console.log('--delete client---', client);
    
    this.ClientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.ClientDoc.delete();
  }
}
