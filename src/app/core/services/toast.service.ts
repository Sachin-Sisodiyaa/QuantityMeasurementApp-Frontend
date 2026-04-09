import { Injectable, signal } from '@angular/core';

export interface ToastItem {
  id: number;
  message: string;
  isError: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly toasts = signal<ToastItem[]>([]);
  private nextId = 1;

  show(message: string, isError = false, duration = 3000): void {
    const id = this.nextId++;
    this.toasts.update((items) => [...items, { id, message, isError }]);

    window.setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number): void {
    this.toasts.update((items) => items.filter((item) => item.id !== id));
  }
}
