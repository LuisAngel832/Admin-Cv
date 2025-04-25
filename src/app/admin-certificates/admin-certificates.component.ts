import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})

export class AdminCertificatesComponent {
  itemCount: number = 0;
    btntxt: string = "Agregar";
    goalText: string = "";
    certificates: Certificates[] = [];
    myCertificates: Certificates = new Certificates();

  constructor(public certificatesServices: CertificatesService){
        console.log(this.certificatesServices);
        this.certificatesServices.getCertificates().snapshotChanges().pipe(
          map (changes =>
      changes.map (c =>
              ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      )    
    )
        ).subscribe(data => {
          this.certificates=data;
    console.log(this.certificates);
        });
  }
  
  AgregarJob(){
   if (this.myCertificates.id) {
      
      this.certificatesServices.update(this.myCertificates.id, this.myCertificates).then(() => {
        console.log('Actualizado correctamente');
        this.resetForm();
      });
    }
    else {
      this.certificatesServices.createCertificates(this.myCertificates).then(() => {
        console.log('Creado correctamente');
        this.resetForm();
      });
    }
  }
      
  deleteJob(id? :string){
    this.certificatesServices.deleteCertificates(id).then(() => {
      console.log('delete item successfully!');
    });
       console.log(id);
  }

  update(item: Certificates) {
    this.myCertificates = { ...item };
    this.btntxt = "Actualizar";
  }

  resetForm(): void {
      this.myCertificates = new Certificates(); // 
      this.btntxt = "Agregar";
    }
}
