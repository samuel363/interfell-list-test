import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('inputSearch') inputSearch;
  @ViewChild('piker') piker;

  data: any;
  tableHeader = [];
  tableBody = [];
  tableBodyFilter = [];

  totalVistos = 0;

  orderByDate = 'DES';

  // pages
  numItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  totalRec = 0;
  itemsPerPage = 10;
  page = 1;
  maxSize = 5;
  target: any;
  //

  dateStart;
  dateEnd;

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
        value.status.toUpperCase().search(text) !== -1 ||
        value.checked.toUpperCase() === text ||
        (value.labels.filter(f => f.toUpperCase().search(text) !== -1 ).length > 0 ) ||
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
    this.totalVistos = this.tableBody.filter(f => f.checked === 'visto' ).length;
  }
  sortByDate(): void{
    const self = this;
    this.tableBodyFilter.sort( ( a, b): number => {
      if (self.orderByDate === 'ASC'){
        return new Date(b.timestamp).getTime() > new Date(a.timestamp).getTime() ? 1 : -1;
      }else{
        return new Date(b.timestamp).getTime() < new Date(a.timestamp).getTime() ? 1 : -1;
      }
    });

    this.orderByDate = this.orderByDate === 'ASC' ? 'DES' : 'ASC';

  }
  clearDataFilter(): void{
    this.tableBodyFilter = this.tableBody;
    console.log(this.dateStart);
    this.dateStart = undefined;
    this.dateEnd = undefined;
    console.log(this.dateStart);
  }
  filterbyDate(): void{
    const self = this;
    if (this.dateStart !== undefined && this.dateEnd !== undefined ){
      this.tableBodyFilter = this.tableBody.filter(f => {
        return (
          self.dateStart.valueOf() < new Date(f.timestamp).getTime() &&
          self.dateEnd.valueOf() > new Date(f.timestamp).getTime()
        );
      });
    }
  }

}
