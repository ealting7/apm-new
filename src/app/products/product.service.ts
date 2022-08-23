import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, EMPTY, filter, map, Observable, tap, throwError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    private productUrl= 'https://ealting7.github.io/apm-new/docs/api/products/products.json'; 

    constructor(private http: HttpClient) {

    }

    getProducts() : Observable<IProduct[]> {

        return this.http.get<IProduct[]>(this.productUrl).pipe(

            //tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }


    

    private handleError(err: HttpErrorResponse)  {

        //maybe send to a logging system    

        let errorMessage = '';

        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred ${err.message}`
        } else {
            errorMessage = `Server return code ${err.status}, error message is ${err.message}`
        }

        console.log(errorMessage);

        return throwError(() => errorMessage)
    }
}