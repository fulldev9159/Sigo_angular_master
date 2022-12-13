import { Component, ViewChild ,OnInit, OnDestroy } from "@angular/core";
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { FileUpload } from "primeng/fileupload";
import { ActaFacade } from "@storeOT/acta/acta.facades";
import { ActaHttpService } from "@services";

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
    joinItems: string[];
    selectedActas: any[] = [];
    csvFileName: string = "";

    csvFile: File;

    constructor(private actaFacade: ActaFacade, private http: HttpClient, private actaHttp: ActaHttpService)   { 
        this.actaFacade.getActasImputacion2();        
        this.additionData = { 
          "acta_estado":"", "usuario":"", "fecha_cont_hem":"", "estado_descripcion":"", "monto_clp":"", 
          "numero_pago":"", "fecha_derivada":"", "estado":"", "numero_cabecera":"", "numero_derivada":"", 
          "tipo_cambio":"", "monto_hem":"", "numero_hem":""
        };
        this.joinItems = [
          "usuario", "fecha_cont_hem", "estado_descripcion", "monto_clp", "numero_pago", "id_detalle", 
          "fecha_derivada", "estado", "numero_cabecera", "codigo_catalogo", "numero_derivada", 
          "fecha_hora", "tipo_cambio", "monto_hem", "numero_hem"
        ];
        this.csvFileName = "Imputacion2_" + this.toConvertType("fecha_hora", "");
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

    onUploadCsvFile(event:any) {      

      var postData:any[] = [];
      var act_id: number = -1, ot_id: number = -1;      
      
      this.integracionData.map((item) => {          
        if ((act_id != Number.parseInt(item?.id_acta)) || (ot_id != Number.parseInt(item?.id_ot))) {

          let combinedData: any = {};

          combinedData.acta_id = act_id = Number.parseInt(item?.id_acta);
          combinedData.ot_id = ot_id = Number.parseInt(item?.id_ot);
          combinedData.acta_estado = Number.parseInt(item?.acta_estado);
          combinedData.items = [];

          postData.push(combinedData);
        }
      });

      postData.map((item) =>  {
        
        var filteredData: any[] = [];
        this.integracionData.reduce((newData, curData)=>{                        

          if (item.acta_id==Number.parseInt(curData.id_acta) && item.ot_id==Number.parseInt(curData.id_ot)) {              
            let obj = this.joinItems.reduce((obj, key)=>({
              ...obj, [key]: this.toConvertType(key, curData[key])
            }), {});              
            filteredData.push(obj);
          }
        },[]);        

        item.items = filteredData;        

      });

      this.actaFacade.getCombineImputacion2(postData);
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
          csvArr.push(headers.reduce((obj, header, index) => ({ 
            ...obj, [header]: curruntRecord[index].trim()
          }), {}));
        }  
      }  

      return csvArr;  
    }  

    toConvertType(key: string, item: string): any {
      
      const whichKey: any = {
        numberKey: ["numero_pago", "id_detalle", "estado", "numero_cabecera", "numero_derivada", "numero_hem", "monto_clp", "tipo_cambio", "monto_hem"],
        stringKey: ["usuario", "fecha_cont_hem", "estado_descripcion", "fecha_derivada", "codigo_catalogo"],
        dateKey: ["fecha_hora"]    
      }
      
      var retValue: any;

      if (whichKey.numberKey.includes(key))  {
        retValue = Number.parseFloat(item);
      } else if (whichKey.stringKey.includes(key)) {
        retValue = item;
      } else {
        retValue = new Date().toISOString();
      }
      
      return retValue;      
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    async getdata(){
      
      var responseData: any;
      var data: any[] = [];

      await this.selectedActas.reduce(async (arr, item) => {

        responseData = await this.actaHttp.getIntegracionData(item?.act_id);
        data = [...data, ...responseData?.data];
      
      }, []);
      
      this.integracionData = data;
    }

}