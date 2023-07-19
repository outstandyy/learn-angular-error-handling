import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private snackBar: MatSnackBar, private zone: NgZone) {
  }

  handleError(error: unknown) {
    // // this.zone.run(() => {
    //   this.snackBar.open('Error was detected!', 'Close', { duration: 2000 });
    //   console.log('Caught by custom handler: ', error);
    // // });

    // call in `zone` because error handling of angular work outside zone (skip cd)
    this.zone.run(() => {
      this.snackBar.open('Error was detected!', 'Close', { duration: 2000 });
      console.log('Caught by custom handler: ', error);
    });
  }
}
