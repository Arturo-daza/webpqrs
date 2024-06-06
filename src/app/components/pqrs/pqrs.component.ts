import { FormBuilder } from '@angular/forms';
import { PQRSService } from '../../services/pqrs.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css']
})
export class PQRSComponent {
  titlePage: string = 'PQRS';
  pqrsList: any = [];
  usuarioId!: string; 
  pqrsForm: any = this.formBuilder.group({
    fecha: Date,
    tipo: '',
    comentarios: '',
    anexo: '',
    estado: '', 
    justificacion: '',
    usuarioId: this.usuarioId
  })
  editablePQRS: boolean = false;
  idPQRS: any;
  tipoUsuario!: string; 
  user: string;


  constructor(private pqrsService: PQRSService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthenticationService) {
    const currentUser = this.authService.getCurrentUser();
    this.user = currentUser ? currentUser.toUpperCase() : 'Usuario';  // Obtiene el nombre del usuario si está disponible
    const tipoUsuario = this.authService.getTipoUsuario();
    this.tipoUsuario = tipoUsuario ? tipoUsuario : 'Usuario';
    const usuarioId = this.authService.getUsuarioId();
    this.usuarioId = usuarioId ? usuarioId : '0';
  }
  ngOnInit() {
    this.getAllPqrs();
    console.log(this.pqrsList)
  }


  getAllPqrs() {
    console.log(localStorage.getItem('ACCESS_TOKEN'))
    this.pqrsService.getAllPQRSData(localStorage.getItem('ACCESS_TOKEN')).subscribe(
      (data: {}) => {
        console.log(data)
        this.pqrsList = data
      }
    );
  }

  newPqrsEntry() {
    console.log(this.pqrsForm.value)
    this.pqrsService.newPQRS(localStorage.getItem('ACCESS_TOKEN'), this.pqrsForm.value).subscribe(
      () => {
        this.router.navigate(['/pqrs']).then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
  }


  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  updatePqrsEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.pqrsForm.value) {
      if (this.pqrsForm.value[key] === '') {
        this.pqrsForm.removeControl(key);
      }
    }
    this.pqrsService.updatePQRS(localStorage.getItem('ACCESS_TOKEN'), this.idPQRS, this.pqrsForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("PQRS editado");
      }
    );
  }

  toggleEditPqrs(id: any) {
    this.idPQRS = id;
    console.log(this.idPQRS)
    this.pqrsService.getOnePQRS(localStorage.getItem('ACCESS_TOKEN'), id).subscribe(
      data => {
        this.pqrsForm.setValue({
          tipo: data.tipo,
          comentarios: data.comentarios,
          anexo: data.anexo,
          estado: data.estado,
          justificacion: data.justificacion,
        });
      }
    );
    this.editablePQRS = !this.editablePQRS;
  }


  deletePqrsEntry(id: any) {
    console.log(id)
    this.pqrsService.deletePQRS(localStorage.getItem('ACCESS_TOKEN'), id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("PQRS eliminado");
      }
    );
  }
}
