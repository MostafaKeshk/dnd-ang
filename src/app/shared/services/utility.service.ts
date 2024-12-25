import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  trackById(index: number, item: any): number {
    return item._id;
  }
}
