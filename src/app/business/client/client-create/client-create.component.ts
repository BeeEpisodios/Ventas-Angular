import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ClientService } from '../../../shared/services/client.service';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, CommonModule], // Añade CommonModule
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
})
export default class ClientCreateComponent {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
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

  onSubmit() {
    if (this.clienteForm.valid) {
      this.clientService.createClient(this.clienteForm.value).subscribe({
        next() {
          console.log('Guardado con exito');
        },
      });
      this.router.navigateByUrl('/clients');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  cancelar() {
    this.router.navigate(['/clients']);
  }
}
