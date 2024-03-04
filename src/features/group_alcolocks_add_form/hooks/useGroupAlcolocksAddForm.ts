import { useState } from 'react';

import { useToggle } from '@shared/hooks/useToggle';
import { getArrayFromValues, getArrayValues } from '@shared/lib/getValuesFromForm';
import type { ID } from '@shared/types/BaseQueryTypes';
import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useGroupAlcolocksAddFormApi } from '../api/useGroupAlcolocksAddFormApi';

export const useGroupAlcolocksAddForm = (branchId: ID, close: () => void) => {
  const [alcolocks, setAlcolocks] = useState<Value[]>([]);
  const [openAlert, toggleAlert, closeAlert] = useToggle(false);
  const [error, setError] = useState(false);
  const { mutate } = useGroupAlcolocksAddFormApi();

  const onSelect = (_type: string, value: string | Value | (string | Value)[]) => {
    setError(false);
    const values = getArrayValues(value);
    setAlcolocks(values);
    closeAlert();
  };
  const onSubmit = () => {
    if (alcolocks.length === 0) {
      setError(true);
      return;
    }
    closeAlert();
    mutate({ branchId, ids: getArrayFromValues(alcolocks) });
    close();
  };

  const handleOpenAlert = () => {
    if (alcolocks.length === 0) {
      setError(true);
      return;
    }
    toggleAlert();
  };

  const showAlert = openAlert && !error && alcolocks.length > 0;
  return { alcolocks, onSelect, error, onSubmit, closeAlert, handleOpenAlert, showAlert };
};
