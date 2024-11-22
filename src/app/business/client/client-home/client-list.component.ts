import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Cliente } from '../../../shared/interfaces/client';
import { ClientService } from '../../../shared/services/client.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatTableModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export default class ClientListComponent implements OnInit {
  displayedColumns: string[] = [
    'idCliente',
    'nombreCliente',
    'direccionCliente',
    'telefonoCliente',
    'acciones',
  ];

  clientes: Cliente[] = [];

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getClients().subscribe((data) => {
      this.clientes = data;
    });
  }

  delete(id: number) {
    this.clientService.deleteClient(id).subscribe((data) => {
      this.clientes = this.clientes.filter(
        (cliente) => cliente.idCliente !== id
      );
    });
  }
}
