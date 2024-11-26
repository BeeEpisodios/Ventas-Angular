import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../../shared/services/client.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-update',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, CommonModule],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css',
})
export default class ClientUpdateComponent {
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
    const clientId = this.activatedRoute.snapshot.paramMap.get('id');
    if (clientId) {
      this.clientService.getClient(Number(clientId)).subscribe({
        next: (foundClient) => {
          this.clienteForm.patchValue(foundClient); // Prellenar el formulario
        },
        error: () => {
          alert('No se pudo cargar el cliente.');
          this.router.navigateByUrl('/clients');
        },
      });
    }
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const clientId = this.activatedRoute.snapshot.paramMap.get('id');
      if (clientId) {
        this.clientService
          .updateClient(this.clienteForm.value, Number(clientId))
          .subscribe({
            next: () => {
              //alert('Cliente actualizado correctamente.');
              this.router.navigateByUrl('/clients'); // Redirige a la lista
            },
            error: () => {
              alert('Error al actualizar el cliente.');
            },
          });
      }
    }
  }

  cancelar() {
    this.router.navigateByUrl('/clients');
  }
}
