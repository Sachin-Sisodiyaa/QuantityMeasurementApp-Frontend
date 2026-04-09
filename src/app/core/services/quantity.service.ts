import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  MeasurementType,
  OperationType,
  QuantityInputDto,
  QuantityMeasurementDto
} from '../models/quantity.models';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/quantities`;

  executeOperation(
    operation: OperationType,
    payload: QuantityInputDto
  ): Observable<QuantityMeasurementDto> {
    return this.http.post<QuantityMeasurementDto>(
      `${this.baseUrl}/${operation}`,
      payload
    );
  }

  getHistoryByOperation(
    operation: OperationType
  ): Observable<QuantityMeasurementDto[]> {
    return this.http.get<QuantityMeasurementDto[]>(
      `${this.baseUrl}/history/operation/${operation}`
    );
  }

  getHistoryByMeasurementType(
    measurementType: MeasurementType
  ): Observable<QuantityMeasurementDto[]> {
    return this.http.get<QuantityMeasurementDto[]>(
      `${this.baseUrl}/history/type/${measurementType}`
    );
  }

  getOperationCount(operation: OperationType): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${operation}`);
  }

  getErrorHistory(): Observable<QuantityMeasurementDto[]> {
    return this.http.get<QuantityMeasurementDto[]>(`${this.baseUrl}/history/errored`);
  }
}
