import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { IProducts } from 'src/app/models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ConfirmDialogComponent>, private productService: ProductsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { }
  confirm = new FormGroup({
    email: new FormControl(),
    phone: new FormControl(),
    name: new FormControl()
  })
  ngOnInit() {
  }

  close(save = false) {
    if(save) {
      this.productService.posOrder({...this.confirm.value}, this.data).subscribe(()=>{
        this._snackBar.open(' Успішно замовлено','', {duration: 5000});
      })
    this.data.map((el: IProducts)=>{
      this.productService.deleteProductFromBasket(el.id).subscribe();
      this.router.navigateByUrl('');
    })

    }
    this.dialog.close();
  }

}
