import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnidadMedida } from 'src/app/interfaces/unidadMedida';
import { UnidadmedidaService } from 'src/app/services/unidadmedida.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ver-unidades',
  templateUrl: './ver-unidades.component.html',
  styleUrls: ['./ver-unidades.component.css']
})
export class VerUnidadesComponent {
  dataSource = new MatTableDataSource<UnidadMedida>();
  id!: number;
  unidad!: UnidadMedida
  loading: boolean = false;
  routeSub!: Subscription;

  constructor( private service: UnidadmedidaService, private aRoute: ActivatedRoute){
     //this.id =  parseInt(this.aRoute.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   this.routeSub = this.aRoute.params.subscribe(data => {
      console.log(data);
      this.id = data['id'];
      this.obtenerProveedorId();
    })

  }

  ngOnDestroy(): void {
      this.routeSub.unsubscribe();
  }

  
  obtenerProveedores() {
    this.loading = true;
    this.service.getProveedores().subscribe(
      (response: any) => {
        this.loading = false;
        console.log(response);
        const data = response && response.response; // Accede a la propiedad 'response'
        
        if (Array.isArray(data)) {
          this.dataSource.data = data;
          console.log(this.dataSource.data);
        } else {
          console.error('La respuesta del servicio no contiene un array válido:', response);
        }
      },
      error => {
        this.loading = false;
        alert('Ha Ocurrido un Error En El Servidor');
      }
    );
  }

  obtenerProveedorId(){
    this.loading = true;
    this.service.getProveedorById(this.id).subscribe( data =>{
      this.unidad = data;
      console.log(data);
      this.loading = false;
    })
  }
}
