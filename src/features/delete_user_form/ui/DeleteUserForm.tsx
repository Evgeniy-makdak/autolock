import type { FC, ReactNode } from 'react';

import { Typography } from '@mui/material';

import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';
import { testids } from '@shared/const/testid';
import type { ID } from '@shared/types/BaseQueryTypes';
import { Button } from '@shared/ui/button';

import { useDeleteUserForm } from '../hooks/useDeleteUserForm';

type DeleteUserFormProps = {
  user: { id: ID; text: ReactNode };
  closeModal: () => void;
};

export const DeleteUserForm: FC<DeleteUserFormProps> = ({ user, closeModal }) => {
  const handleDelete = useDeleteUserForm(user.id, closeModal);
  return (
    <>
      <Typography marginBottom={3} fontWeight={700} variant="h6">
        Удаление пользователя
      </Typography>
      <Typography>Вы действительно хотите удалить пользователя {user.text}</Typography>
      <ButtonFormWrapper>
        <Button testid={`${testids.POPUP_ACTION_BUTTON}`} onClick={handleDelete}>
          удалить
        </Button>
        <Button testid={`${testids.POPUP_CANCEL_BUTTON}`} onClick={closeModal}>
          отмена
        </Button>
      </ButtonFormWrapper>
    </>
  );
};
