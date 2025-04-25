import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})

export class LanguagesService {

  private dbPath='/Languages';

	languagesRef: AngularFirestoreCollection<Languages>;

  constructor(private db: AngularFirestore) {
 	this.languagesRef=db.collection(this.dbPath);
  }

  getLanguages(): AngularFirestoreCollection<Languages>{
    return this.languagesRef;
  }


  createLanguage(myJob: Languages): any {
    return this.languagesRef.add({ ...myJob });
  }

  deleteLanguage(id? : string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }

  update(id: string,myJob: Languages): any {
    return this.languagesRef.doc(id).set({ ...myJob }, { merge: true });
  }
}