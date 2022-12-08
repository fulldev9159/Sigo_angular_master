import { Component, ViewChild ,OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { ActaFacade } from "@storeOT/acta/acta.facades";
import { keys } from "lodash";
import { NgModule } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'zwc-ots-payment',
    templateUrl: './ots-payment.component.html',
    styleUrls:['./ots-payment.component.scss'],
})
export class OtsPaymentComponent implements OnInit, OnDestroy {
    @ViewChild('dt') table: Table;
    @ViewChild('fileUpload') fileUpload: FileUpload;

    subscription: Subscription = new Subscription();
    imputacion2: any;

    loading: boolean = false;
    integracionData: any[] = [];
    integracionDataColumn: any[] = [];    
    additionData:any;
    selectedActas: any[] = [];

    csvFile: File;

    constructor(private actaFacade: ActaFacade, private http: HttpClient)   { 
        this.actaFacade.getActasImputacion2();        
        this.additionData = {"acta_estado":"", "usuario":"", "fecha_cont_hem":"", "estado_descripcion":"", "monto_clp":"", "numero_pago":"", "fecha_derivada":"", "estado":"", "numero_cabecera":"", "numero_derivada":"", "tipo_cambio":"", "monto_hem":"", "numero_hem":""};
    }

    ngOnInit(): void {        
        this.actaFacade.getActasImputacion2$().subscribe(response => {            
            this.imputacion2 = response?.items;           
        });        
    }

    onAdditionData(data: object): void {
      this.integracionData = this.integracionData.map((array)=>{
        return {...array, ...data};
      });
    }

    onGetKeyFromIntegracionData(data: object): any[] {      
        const keys = !data? null: Object.keys(data).reduce((arr, key) => [...arr, {header: key, field: key}], []);
        return keys;
    }

    onDownloadCSV(): void {
    }

    async getImputacionData(data:any[]) {      
      this.loading = true;

      if (!data)  {
        
        // get data from server...
        await this.getdata();
      
        if (this.integracionData?.length>0)  {
          this.onAdditionData(this.additionData);
          this.fileUpload.clear();
        }

      } else {
        this.integracionData = data;
      }

      this.integracionDataColumn = this.onGetKeyFromIntegracionData(this.integracionData?.[0]);

      setTimeout(() => { this.loading = false; }, 1000);
    }

    onUploadCsvFile(event:any): void {      


      this.fileUpload.clear();
    }

    onChangeCsvFile(event:any): void {

      this.csvFile = event.currentFiles[0];

      let reader = new FileReader();
      reader.readAsText(this.csvFile);
  
      reader.onload = () => {
        const csvData = reader.result;  
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);    
        const headers = this.getHeaderArray(csvRecordsArray);
        this.getImputacionData(this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headers));        
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };        
    }
    
    getHeaderArray(csvRecordsArr: any) {  
      const headers = (<string>csvRecordsArr[0]).split(',');  
      const headerArray = [];  
      for (let col = 0; col < headers.length; col++) {  
        headerArray.push(headers[col]);  
      }
      return headerArray;
    }  

    getDataRecordsArrayFromCSVFile(csvRecordsArray: any[], headers: any[]) {

      var csvArr = [];  
      for (let i = 1; i < csvRecordsArray.length; i++) {  
        let curruntRecord = (<string>csvRecordsArray[i]).replace(/"/g, "").split(',');  
        if (curruntRecord.length == headers.length) {  
          csvArr.push(headers.reduce((obj, header, index) => ({...obj, [header]: curruntRecord[index].trim()}), {}));
        }  
      }  

      return csvArr;  
    }  

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    async getdata(){
      
      const url = 'http://34.122.92.38:4041/simulators/imputacion/integracion1/payload/get';
      const body = "";
      

      this.integracionData = await this.selectedActas.reduce(async (arr, item) => {
        
        const responseData: any = await this.http.post(url, {'acta_id':item?.act_id},
          {headers:{'content-type':"application/json"}}
        ).toPromise().then();
        console.log(responseData);
        return [...arr, ...responseData?.data]
    }, []);

  }

}