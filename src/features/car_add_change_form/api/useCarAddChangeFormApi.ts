import { CarsApi } from '@shared/api/baseQuerys';
import { QueryKeys } from '@shared/const/storageKeys';
import { useUpdateQueries } from '@shared/hooks/useUpdateQuerys';
import type { ChangeCarBody, CreateCarBody, ID } from '@shared/types/BaseQueryTypes';
import { useMutation, useQuery } from '@tanstack/react-query';

const updateQueries = [QueryKeys.VEHICLES_PAGE_TABLE, QueryKeys.CAR_LIST, QueryKeys.CAR_ITEM];

export const useCarAddChangeFormApi = (id?: ID) => {
  const update = useUpdateQueries();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.CAR_ITEM, id],
    queryFn: () => CarsApi.getCar(id),
    enabled: !!id,
  });

  const { mutateAsync: changeItem } = useMutation({
    mutationFn: (changeData: ChangeCarBody) => CarsApi.changeCar(changeData, id),
    onSuccess: () => update(updateQueries),
  });

  const { mutateAsync: createItem } = useMutation({
    mutationFn: (changeData: CreateCarBody) => CarsApi.createCar(changeData),
    onSuccess: () => update(updateQueries),
  });

  return { car: data?.data, isLoadingCar: isLoading, changeItem, createItem };
};
