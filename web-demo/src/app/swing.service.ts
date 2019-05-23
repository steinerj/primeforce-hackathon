import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SwingService {
  private baseUrl = 'http://localhost:8080';
  // private baseUrl = 'https://2e9fb382.ngrok.io';

  constructor(private http: HttpClient) { }

  // http://localhost:8080/login`
  public login(user: User): Observable<any> {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);

    return this.http.post(`${this.baseUrl}/login`, formData);
  }

  // http://localhost:8080/projects
  public getProjects(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/projects`)
    .pipe(
      map(res => res._embedded.projects)
    );
  }

  // http://localhost:8080/projects/[id]
  public getProject(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/projects/${id}`);
  }

  // http://localhost:8080/users
  public getUsers(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/users`)
    .pipe(
      map(res => res._embedded.users)
    );
  }

  // http://localhost:8080/serviceProviders
  public getProviders(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/serviceProviders`)
    .pipe(
      map(res => res._embedded.serviceProviders)
    );
  }
  // http://localhost:8080/serviceProviders/[id]
  public getProvider(id: string): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/serviceProviders/${id}`);
  }

  public getProjectsForProvider(provider: any) {
    const projectUrl = provider._links.projects.href;

    return this.http.get<any>(projectUrl)
    .pipe(
      map(res => res._embedded.projects)
    );
  }

  public getProviderForProject(project: any) {
    const providerUrl = project._links.serviceProvider.href;

    return this.http.get<any>(providerUrl)
    .pipe(
      map(res => res._embedded.projects)
    );
  }

  public parseId(item: any) {
    const href: string = item._links.self.href;

    return href.split('/').pop();
  }
}
