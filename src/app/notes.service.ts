import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private _httpClient:HttpClient) { }

  addNote(note:object):Observable<any>{
    return this._httpClient.post("https://movies-api.routemisr.com/addNote",note);
   }
   getUserNotes(note:object):Observable<any>{
  return this._httpClient.post("https://movies-api.routemisr.com/getUserNotes",note);
   }
   deleteNote(note:object):Observable<any>{
    // let options:any={
    //   body:{
    //     NoteID:'',
    //     token:'',

    //   }
    // }
     return this._httpClient.delete("https://movies-api.routemisr.com/deleteNote",note);
   }
   updateNote(note:object){
     return this._httpClient.put("https://movies-api.routemisr.com/updateNote",note);
   }
}
