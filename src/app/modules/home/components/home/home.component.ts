import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('inputSearch') inputSearch;

  data: any;
  tableHeader = [];
  tableBody = [];
  tableBodyFilter = [];

  totalVistos = 0;

  // pages
  numItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  totalRec = 0;
  itemsPerPage = 10;
  page = 1;
  maxSize = 5;
  target: any;
  //

  constructor(
    private listService: ListService
  ) {
    this.data = listService.getData();
    this.tableBody = this.data.events;
    this.tableHeader = Object.keys(this.tableBody[0]);
    this.totalRec = this.tableBody.length;
    this.tableBodyFilter = this.tableBody;

    this.countChekeds();
  }

  ngOnInit(): void {
  }

  handleClear(): void {
    this.tableBodyFilter = this.tableBody;
    this.inputSearch.nativeElement.value = '';
    this.inputSearch.nativeElement.placeholder = 'Buscar';
  }
  updateTable(text): void {
    text = text.toUpperCase();
    const self = this;
    this.tableBodyFilter = [];
    this.tableBody.forEach( (value) => {
      if (
        value.id.toString().toUpperCase().search(text) !== -1 ||
        value.criticality.toUpperCase().search(text) !== -1 ||
        value.timestamp.toUpperCase().search(text) !== -1 ||
        value.status.toUpperCase().search(text) !== -1 ||
        value.checked.toUpperCase() === text ||
        (value.labels.filter(f => { return f.toUpperCase().search(text) !== -1 }).length > 0 ) ||
        (value.eventBody.symbol === undefined ? false : value.eventBody.symbol.toUpperCase().search(text) !== -1 ) ||
        (value.eventBody.codigoOperacion === undefined ? false : value.eventBody.codigoOperacion.toUpperCase().search(text) !== -1 )
      ){
        self.tableBodyFilter.push(value);
      } else {
        console.log('Does not contain Apples');
      }
    });
  }

  saveItemPerPage(item: any): void{
    this.itemsPerPage = item;
  }
  changeChecked(row: any): void{
    if (row.checked === 'visto'){
      row.checked = 'no ' + row.checked;
      this.totalVistos--;
    }else{
      row.checked = row.checked.replace('no ', '');
      this.totalVistos++;
    }
  }
  countChekeds(): void{
    this.totalVistos = this.tableBody.filter(f => { return f.checked === 'visto' }).length;
  }

}
