import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Cliente } from '../../../shared/interfaces/client';
import { ClientService } from '../../../shared/services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export default class ClientListComponent implements OnInit {
  displayedColumns: string[] = [
    'idCliente',
    'nombreCliente',
    'direccionCliente',
    'telefonoCliente',
  ];

  clientes: Cliente[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getClients().subscribe((data) => {
      this.clientes = data;
      console.log('Clientes obtenidos:', data);
    });
  }
}
