export type MeasurementType =
  | 'Length'
  | 'Volume'
  | 'Weight'
  | 'Temperature';

export type OperationType = 'compare' | 'convert' | 'add' | 'subtract' | 'multiply' | 'divide';

export interface QuantityDto {
  value: number;
  unit: string;
  measurementType: MeasurementType;
}

export interface QuantityInputDto {
  thisQuantityDTO: QuantityDto;
  thatQuantityDTO: QuantityDto;
}

export interface QuantityMeasurementDto {
  id?: number;
  thisValue: number;
  thisUnit: string;
  thisMeasurementType: MeasurementType;
  thatValue: number;
  thatUnit: string;
  thatMeasurementType: MeasurementType;
  operation: OperationType;
  resultString: string;
  resultValue: number;
  resultUnit: string;
  resultMeasurementType: MeasurementType;
  errorMessage: string;
  isError: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export const measurementUnits: Record<MeasurementType, string[]> = {
  Length: ['MM', 'CM', 'METER', 'KM', 'INCH', 'FOOT', 'YARD', 'MILE'],
  Volume: ['ML', 'LITER', 'GALLON', 'PINT', 'CUBIC_METER'],
  Weight: ['MG', 'GRAM', 'KG', 'OUNCE', 'POUND'],
  Temperature: ['CELSIUS', 'FAHRENHEIT', 'KELVIN']
};
