export interface SizeRangeSliderProps {
  ranges: number[][];
  labels: string[];
  min: number[];
  max: number[];
  steps: number[];
  onChangeHandlers: ((values: number[]) => void)[];
  ignoreSize: boolean;
  onIgnoreSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
