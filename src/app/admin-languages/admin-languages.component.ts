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
	console.log(this.languages);
      });
    }

    AgregarJob(){
      if(this.myLaguages.id){
        this.languagesService.update(this.myLaguages.id, this.myLaguages). then(() =>
        {
          console.log("Update successfully!");
          this.resetForm();
        });
      }else{
        this.languagesService.createLanguage(this.myLaguages).then(() => {
          console.log('Created successfully');
          this.resetForm();
        });
      }
    }
    
    deleteJob(id? :string){
      this.languagesService.deleteLanguage(id).then(() => {
        console.log('delete item successfully!');
      });
         console.log(id);
    }

      update(item: Languages) {
        this.myLaguages = { ...item };
        this.btntxt = "Actualizar";
      }
    
      resetForm() {
        this.myLaguages = new Languages();
        this.btntxt = "Agregar";
      }
}