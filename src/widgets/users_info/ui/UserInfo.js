import { useEffect, useState } from 'react';

// TODO => убрать связь со app
import { AppConstants } from '@app';
import { Info } from '@entities/info';
// TODO => убрать связь со страницей
import { getUser } from '@pages/users/model/effects';
import { Loader } from '@shared/ui/loader';
import { Formatters } from '@shared/utils/formatters';

export const UserInfo = ({ selectedUserId, updateData }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUserId) return;
    setLoading(true);
    getUser(selectedUserId)
      .then((res) => {
        if (res) {
          setLoading(false);
          setUserData(res);
        }
      })
      .catch(() => setLoading(false));
  }, [selectedUserId, updateData]);

  return (
    <Loader isLoading={loading}>
      <Info
        fields={[
          {
            label: 'Пользователь:',
            value: Formatters.nameFormatter(userData),
          },
          {
            label: 'Дата рождения:',
            value: Formatters.convertDateFormat(userData?.birthDate),
          },
          {
            label: 'Номер телефона:',
            value: userData?.phone ?? '-',
          },
          {
            label: 'Почта:',
            value: userData?.email ?? '-',
          },
          {
            label: 'Роли:',
            value:
              userData?.groupMembership
                ?.map((group) => {
                  return group.group.name;
                })
                .join(', ') ?? '-',
          },
          {
            label: 'Доступ:',
            value: userData
              ? AppConstants.accessList.find((access) => access.value === userData.disabled)
                  ?.label ?? '-'
              : '-',
          },
          {
            label: 'Номер ВУ:',
            value: userData?.driver?.licenseCode ?? '-',
          },
          {
            label: 'Дата выдачи:',
            value: Formatters.convertDateFormat(userData?.driver?.licenseIssueDate),
          },
          {
            label: 'Срок:',
            value: Formatters.convertDateFormat(userData?.driver?.licenseExpirationDate),
          },
          {
            label: 'Категории:',
            value: (userData?.driver?.licenseClass ?? []).length
              ? userData?.driver.licenseClass.join(', ')
              : '-',
          },
        ]}
      />
    </Loader>
  );
};