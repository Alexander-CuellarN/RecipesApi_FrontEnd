import { MatSnackBar } from "@angular/material/snack-bar";

export function showNotificaction(message: string, action: string, _snackBar: MatSnackBar): void {
    _snackBar.open(message, action, {
        horizontalPosition: 'end',
        verticalPosition: "top",
        duration: 2000
    })
}