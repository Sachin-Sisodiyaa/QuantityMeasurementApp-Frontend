export type MeasurementType =
  | 'LengthUnit'
  | 'VolumeUnit'
  | 'WeightUnit'
  | 'TemperatureUnit';

export type OperationType = 'compare' | 'convert' | 'add' | 'subtract' | 'divide';

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
  error: boolean;
}

export const measurementUnits: Record<MeasurementType, string[]> = {
  LengthUnit: ['FEET', 'INCHES', 'YARDS', 'CENTIMETERS'],
  VolumeUnit: ['LITRE', 'MILLILITRE', 'GALLON'],
  WeightUnit: ['KILOGRAM', 'GRAM', 'POUND'],
  TemperatureUnit: ['CELSIUS', 'FAHRENHEIT', 'KELVIN']
};
