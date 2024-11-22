import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientService } from '../../../shared/services/client.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export default class ViewComponent {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.clienteForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      direccionCliente: [''],
      telefonoCliente: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)],
      ],
    });
  }

  ngOnInit() {
    let clientId = this.activatedRoute.snapshot.paramMap.get('idCliente');

    const clientData = this.clientService
      .getClient(Number(clientId))
      .subscribe({
        next: (foundClient) => {
          this.clienteForm.patchValue(foundClient);
        },
      });
    this.clienteForm.patchValue(clientData);
    this.clienteForm.disable();
  }

  cancelar() {
    this.router.navigateByUrl('/clients');
  }
}
