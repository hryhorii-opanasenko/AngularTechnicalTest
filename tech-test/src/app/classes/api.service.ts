import { Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "@env/environment";

export class ApiService {
  private httpClient: HttpClient;
  protected apiUrl = environment.apiUrl;

  constructor(protected injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }

  protected get<T>(
    path: string,
    options: { [param: string]: unknown } = {}
  ): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${path}`, options);
  }

  protected post<T>(
    path: string,
    body: unknown,
    options: { [param: string]: unknown } = {}
  ): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}/${path}`, body, options);
  }

  protected patch<T>(
    path: string,
    body: unknown,
    options: { [param: string]: unknown } = {}
  ): Observable<T> {
    return this.httpClient.patch<T>(`${this.apiUrl}/${path}`, body, options);
  }

  protected put<T>(
    path: string,
    body: unknown,
    options: { [param: string]: unknown } = {}
  ): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl}/${path}`, body, options);
  }

  protected delete<T>(
    path: string,
    options: { [param: string]: unknown } = {}
  ): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl}/${path}`, options);
  }
}
