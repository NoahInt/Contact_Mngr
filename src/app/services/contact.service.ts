import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { IContact } from "../models/IContact"
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl:string = `http://localhost:9000`;

  constructor(private httpClient: HttpClient) { }

  //Get All Contacts
  public getAllContacts(): Observable<IContact[]> {
    let dataURL:string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  //Get 1 Contact
  public getContact(contactID: string): Observable<IContact>{
    let dataURL : string = `${this.serverUrl}/contacts/${contactID}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  //Create Contact
  public createContact(contact : IContact): Observable<IContact>{
    let dataURL : string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError))
  }

  //Update Contact
  public updateContact(contact : IContact, contactID: string): Observable<IContact>{
    let dataURL : string = `${this.serverUrl}/contacts/${contactID}`;
    return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError))
  }

  //Delete Contact
  public deleteContact(contactID: string): Observable<{}>{
    let dataURL : string = `${this.serverUrl}/contacts/${contactID}`;
    return this.httpClient.delete<{ }>(dataURL).pipe(catchError(this.handleError))
  }

  //Get Groups
  public getAllGroups(): Observable<IGroup[]> {
    let dataURL: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
  }

  //Get 1 Group
  public getGroup(contact: IContact): Observable<IGroup>{
    let dataURL : string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
  }

  //Error Handling
  public handleError(error: HttpErrorResponse){
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent){
      errorMessage = `Error : ${error.error.message}`
    } else{
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
    
  }
}
