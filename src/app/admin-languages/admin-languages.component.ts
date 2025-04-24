import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  itemCount: number = 0;
    btntxt: string = "Agregar";
    goalText: string = "";
    languages: Languages[]=[];
    myLaguages: Languages = new Languages();

    constructor(public languagesService: LanguagesService){
      console.log(this.languagesService);
      this.languagesService.getLanguages().snapshotChanges().pipe(
        map (changes =>
	  changes.map (c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
	  )    
	)
      ).subscribe(data => {
        this.languages=data;
	console.log("lenguaes extraidos de firebase" , this.languages);
      });
    }

    AgregarJob(){
      console.log(this.myLaguages);
      this.languagesService.createLanguage(this.myLaguages).then(() => {
        console.log('Created new item successfully!');
      });
    }
    
    deleteJob(id? :string){
      this.languagesService.deleteLanguage(id).then(() => {
        console.log('delete item successfully!');
      });
         console.log(id);
    }
}
