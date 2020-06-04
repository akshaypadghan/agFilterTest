import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AgGridAngular} from 'ag-grid-angular';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("agGrid") agGrid: AgGridAngular;

  title = 'agFilterTest';

  columnDefs = [
        {headerName: 'Make', field: 'make', rowGroup: true},
        {headerName: 'Price', field: 'price'}
    ];

    autoGroupColumnDef = {
            headerName: 'Model',
            field: 'model',
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: {
                checkbox: true
            }
        };
    rowData: any;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
      this.rowData = this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json');
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
}
