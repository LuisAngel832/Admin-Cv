import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interests } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})

export class InterestsService {

  private dbPath = '/Interest';
  interestsRef: AngularFirestoreCollection<Interests>;

  constructor(public db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterest(): AngularFirestoreCollection<Interests>{
    return this.interestsRef;
  }

  createInterests(myJob: Interests): any {
    return this.interestsRef.add({ ...myJob });
  }

  deleteInterets(id? : string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }
}
