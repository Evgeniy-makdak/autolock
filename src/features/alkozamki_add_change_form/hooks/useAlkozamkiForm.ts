import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { getArrayValues } from '@shared/lib/getValuesFromForm';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import type { ID } from '@shared/types/BaseQueryTypes';
import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';
import { Formatters } from '@shared/utils/formatters';

import { useAlkozamkiFormApi } from '../api/useAlkozamkiFormApi';
import { type Form, schema } from '../lib/validate';

export const useAlkozamkiForm = (id?: ID, closeModal?: () => void) => {
  const [selectedBranch] = selectedBranchStore.selectedBranch.useState();
  const { alkolock, isLoadingAlkolock, changeItem, createItem } = useAlkozamkiFormApi(id);
  const car = alkolock?.vehicleBind?.vehicle;

  const defaultValues =
    alkolock && !isLoadingAlkolock
      ? {
          name: alkolock?.name || '',
          serialNumber: alkolock?.serialNumber || '',
          uid: alkolock?.serviceId || '',
          tc: car
            ? [
                {
                  label: Formatters.carNameFormatter(car),
                  value: car?.id,
                },
              ]
            : [],
        }
      : null;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors: { name: nameAlkolock, serialNumber, uid },
    },
  } = useForm<any>({
    resolver: yupResolver(schema),
    values: defaultValues,
  });

  const onSelect = (type: keyof Form, value: string | Value | (string | Value)[]) => {
    const values = getArrayValues(value);
    setValue(type, values);
  };

  const errorName = nameAlkolock ? nameAlkolock.message.toString() : '';
  const errorSerialNumber = serialNumber ? serialNumber.message.toString() : '';
  const errorUid = uid ? uid.message.toString() : '';

  const onSubmit = async (data: Form) => {
    const car = data?.tc?.length ? data?.tc[0]?.value : '';
    const payload = {
      branchId: 'id' in selectedBranch ? selectedBranch.id : 10,
      name: data.name,
      serialNumber: data.serialNumber,
      serviceId: data.uid,
      vehicleId: car,
    };

    id ? await changeItem(payload) : await createItem(payload);
    closeModal();
  };
  return {
    errorName,
    errorSerialNumber,
    errorUid,
    nameAlkolock,
    serialNumber,
    uid,
    register,
    handleSubmit: handleSubmit(onSubmit),
    onSelect,
    tc: watch('tc'),
    isLoadingAlkolock,
  };
};
