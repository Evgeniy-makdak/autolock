import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useTypeEventSelect } from '../hooks/useTypeEventSelect';

interface TypeEventSelectProps<T> {
  onSelect?: (value: number[] | number) => void;
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  name: keyof T;
  value?: Value[];
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
}

export function TypeEventSelect<T>(props: TypeEventSelectProps<T>) {
  const { marksCarList } = useTypeEventSelect();
  return <SearchMultipleSelect values={marksCarList} {...props} />;
}
