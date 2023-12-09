import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadMedida } from '../interfaces/unidadMedida';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<UnidadMedida[]>{
    return this.http.get<UnidadMedida[]>('https://compraswebapi.azurewebsites.net/api/UnidadDeMedida/List');
  }

  getProveedorById(id: number): Observable<UnidadMedida> {
    return this.http.get<UnidadMedida>(`https://compraswebapi.azurewebsites.net/api/UnidadMedida/${id}`);
  }

  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`https://compraswebapi.azurewebsites.net/api/UnidadMedida/${id}`);
  }

  agregarProveedor(unidad:UnidadMedida ): Observable<UnidadMedida>{
    return this.http.post<UnidadMedida>(`https://compraswebapi.azurewebsites.net/api/UnidadMedida`, unidad);
  }

  updateProveedor( id: number, unidad: UnidadMedida): Observable<void>{
    return this.http.put<void>(`https://compraswebapi.azurewebsites.net/api/UnidadMedida/${id}`, unidad )
  }
}
