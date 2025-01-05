export interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

export interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
} 