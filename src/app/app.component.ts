import { Component } from '@angular/core';
import {ExcelService} from './services/excel.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  willDownload = false;
  initialData = ["emp_id","date","salgroup"];
  salcomponents = ["AA","bb"];
  empData = ["A002","A006","A009"]
  data: any = [
    {
    emp_id: null,
    date: null,
    salgroup: null ,
    AA: null,
    bb: null
  },
  {emp_id :"A002"},
  {emp_id :"A006"}

];
  constructor(private excelService:ExcelService){

  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(dataString);
      
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }
}
