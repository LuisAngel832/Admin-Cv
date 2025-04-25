import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent {
  btntxt: string = "Agregar";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();

  constructor(private workExperienceService: WorkExperienceService) {
    this.loadWorkExperiences();
  }

  loadWorkExperiences(): void {
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe(data => {
      this.workExperience = data;
    });
  }

  AgregarJob(): void {
    const { id, ...data } = this.myWorkExperience;
  
    if (id) {
      // UPDATE
      this.workExperienceService.update(id, this.myWorkExperience).then(() => {
        console.log("✅ Actualización exitosa");
        this.resetForm();
      }).catch(err => console.error("❌ Error en update:", err));
    } else {
      // CREATE solo si NO hay ID
      this.workExperienceService.createWorkExperience(data).then(() => {
        console.log("🆕 Creado correctamente");
        this.resetForm();
      }).catch((err: any) => console.error("❌ Error en create:", err));
    }
  }
  

  update(item: WorkExperience): void {
    this.myWorkExperience = { ...item };
    this.btntxt = "Actualizar";
  }
  

  deleteJob(id?: string): void {
    if (!id) return;
    this.workExperienceService.deleteWorkExperience(id).then(() => {
      console.log("🗑️ Eliminado correctamente:", id);
    });
  }

  resetForm(): void {
    this.myWorkExperience = new WorkExperience(); 
    this.btntxt = "Agregar";
  }
  
}
