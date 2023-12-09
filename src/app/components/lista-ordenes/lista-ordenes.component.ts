import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenesCompra } from 'src/app/interfaces/OrdenesCompra';
import { OrdenesCompraService } from 'src/app/services/ordenes-compra.service';

@Component({
  selector: 'app-lista-ordenes',
  templateUrl: './lista-ordenes.component.html',
  styleUrls: ['./lista-ordenes.component.css']
})
export class ListaOrdenesComponent {
  constructor(private _snackBar: MatSnackBar, private _service: OrdenesCompraService){}

  displayedColumns: string[] = ['OrderNumber', 'Estado', 'Articulo', 'Stock', 'Medida', 'CostoUnitario', 'FechaOrden', 'Actions'];
  dataSource = new MatTableDataSource<OrdenesCompra>();
  loading: boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.obtenerProveedores()
  }


  obtenerProveedores() {
    this.loading = true;
    this._service.getProveedores().subscribe(
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

  eliminar(id: number){

    this.loading = true;

    this._service.deleteProveedor(id).subscribe( () => {
      this.mensajeExito();
      this.obtenerProveedores();

    })



  }

  mensajeExito(){
    setTimeout(() => {
      this.loading = false;
      this._snackBar.open('Eliminado Con Exito', '', {
        duration:3500,
        horizontalPosition: 'right'
      })

    }, 3000);
  }
}
