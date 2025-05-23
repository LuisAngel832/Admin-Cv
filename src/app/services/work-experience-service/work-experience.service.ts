import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})

export class WorkExperienceService {

  private dbPath = '/Work-experience';
  workExperienceRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private db : AngularFirestore) { 
    this.workExperienceRef = db.collection(this.dbPath);
  }

  getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workExperienceRef;
  }

  createWorkExperience(myJob: WorkExperience): any {
    return this.workExperienceRef.add({ ...myJob });
  }

  deleteWorkExperience(id? : string): Promise<void> {
    console.log(id);
    return this.workExperienceRef.doc(id).delete();
  }

  update(id: string, myJob: WorkExperience): Promise<void> {
    const { id: _, ...data } = myJob; 
    return this.workExperienceRef.doc(id).set(data, { merge: true });
  }
  
  
} 