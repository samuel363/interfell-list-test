import { Injectable } from '@angular/core';
import DataJson from '../data/test_json.json';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() {
    console.log(DataJson);
  }

  getData(){
    return DataJson;
  }

}
