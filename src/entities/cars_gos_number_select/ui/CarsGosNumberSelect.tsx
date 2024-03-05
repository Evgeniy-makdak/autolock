import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useCarsGosNumberSelect } from '../hooks/useCarsGosNumberSelect';

interface CarsGosNumberSelectProps<T> {
  testid: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
  name: keyof T;
  value: Value[];
}

export function CarsGosNumberSelect<T>(props: CarsGosNumberSelectProps<T>) {
  const { onChange, onReset, isLoading, carList } = useCarsGosNumberSelect();
  return (
    <SearchMultipleSelect
      onReset={onReset}
      onInputChange={onChange}
      isLoading={isLoading}
      values={carList}
      {...props}
    />
  );
}
