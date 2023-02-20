import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-transactions',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
})
export class TransactionsComponent implements OnInit {

    @Input() transactionStatus!: any;
    page: number = 1;
    count: number = 0;
    tableSize: number = 50;
    tableSizes: any = [3, 6, 9, 12];
    myTransactions: any = [];

    transactionColumns: string[] = [];

    ngOnInit(): void {
        console.log('Method not implemented.', this.transactionStatus);

        this.updateTransactionColumns();
    }

    updateTransactionColumns() {
        if (this.transactionStatus === 'Sell') {
            this.transactionColumns = ['Type', 'Project', 'NMA', 'Price', 'Buyer', 'Action', 'Status', 'Progress'];
        } else {
            this.transactionColumns = ['Type', 'Project', 'NMA', 'Price', 'Seller', 'Action', 'Status', 'Progress'];
        }
    }

    handleGetSellerTransactions() {
        // ...
    }

    handleGetBuyingTransactions() {
        // ...
    }

    toggleListing(type: any) {
        this.transactionStatus = type;
        this.updateTransactionColumns();
    }

    onTableDataChange(event: any) {
        this.page = event;
    }

    onTableSizeChange(event: any): void {
        this.tableSize = event.target.value;
        this.page = 1;
    }

    handleMyTransactionsLength() {
        if (this.myTransactions) {
            return this.myTransactions.length;
        }
        return 0;
    }
}
