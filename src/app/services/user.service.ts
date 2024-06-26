import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

export interface User {
  id: string;
  nome: string;
  username: string;
  password: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  getCurrentUser(): Observable<User | null> {
    const userId = this.storageService.getItem('userId');
    if (!userId) {
      return of(null);
    }
    return this.apiService.getUserById(userId);
  }
}
