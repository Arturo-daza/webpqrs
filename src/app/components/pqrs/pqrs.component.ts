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
  pqrsForm: any = this.formBuilder.group({
    fecha: Date,
    tipo: '',
    comentarios: '',
    anexo: '',
    estado: '', 
    justificacion: '',
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

  newAnimalEntry() {
    this.pqrsService.newPQRS(localStorage.getItem('accessToken'), this.pqrsForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /animal y recargando la ventana
        this.router.navigate(['/animal']).then(() => {
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
    this.pqrsService.updatePQRS(localStorage.getItem('accessToken'), this.idPQRS, this.pqrsForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Animal editado");
      }
    );
  }

  toggleEditAnimal(id: any) {
    this.idPQRS = id;
    console.log(this.idPQRS)
    this.pqrsService.getOnePQRS(localStorage.getItem('accessToken'), id).subscribe(
      data => {
        this.pqrsForm.setValue({
          nombre: data.nombre,
          edad: data.edad,
          tipo: data.tipo,
          fecha: this.getValidDate(data.fecha)
        });
      }
    );
    this.editablePQRS = !this.editablePQRS;
  }

  getValidDate(fecha: Date) {
    const fechaFinal: Date = new Date(fecha);
    //separado los datos
    var dd = fechaFinal.getDate() + 1;//fue necesario porque siempre daba un día antes
    var mm = fechaFinal.getMonth() + 1; //porque Enero es 0
    var yyyy = fechaFinal.getFullYear();
    var mes = '';
    var dia = '';

    //Como algunos meses tienen 31 días dd puede dar 32
    if (dd == 32) {
      dd = 1;
      mm++;
    }
    //Transformación de fecha cuando el día o mes son menores a 10
    //se le coloca un cero al inicio
    //Día
    if (dd < 10) {
      dia += `0${dd}`;
    } else {
      dia += `${dd}`;
    }
    //Mes
    if (mm < 10) {
      mes += `0${mm}`;
    } else {
      mes += `${mm}`;
    }
    //formatDate para colocar la fecha en un formato aceptado por el calendario
    //GMT-0500 es para Colombia
    var finalDate = formatDate(new Date(yyyy + '-' + mes + '-' + dia + ' GMT-0500'), 'yyyy-MM-dd', "en-US");
    return finalDate;
  }

  deleteAnimalEntry(id: any) {
    console.log(id)
    this.pqrsService.deletePQRS(localStorage.getItem('accessToken'), id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Animal eliminado");
      }
    );
  }
}
