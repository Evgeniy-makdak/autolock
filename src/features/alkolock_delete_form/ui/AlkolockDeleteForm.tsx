import { Typography } from '@mui/material';

import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';
import { testids } from '@shared/const/testid';
import type { ID } from '@shared/types/BaseQueryTypes';
import { Button } from '@shared/ui/button';

import { useAlkolockDeleteForm } from '../hooks/useAlkolockDeleteForm';

export const AlkolockDeleteForm = ({
  alkolock,
  closeDeleteModal,
}: {
  alkolock: { id: ID; text: string | null | undefined };
  closeDeleteModal: () => void;
}) => {
  const handleDelete = useAlkolockDeleteForm(alkolock?.id, closeDeleteModal);
  return (
    <>
      <div>
        <Typography variant="h6" fontWeight={700}>
          Удаление Алкозамка
        </Typography>
        <Typography>
          Вы действительно хотите удалить Алкозамок <b>{alkolock?.text}?</b>
        </Typography>
        <ButtonFormWrapper>
          <Button
            testid={`${testids.POPUP_ACTION_BUTTON}_${testids.page_attachments.attachments_popup_delete_attach.ATTACHMENTS_DELETE_ATTACH}`}
            onClick={handleDelete}>
            удалить
          </Button>
          <Button
            testid={`${testids.POPUP_CANCEL_BUTTON}_${testids.page_attachments.attachments_popup_delete_attach.ATTACHMENTS_DELETE_ATTACH}`}
            onClick={closeDeleteModal}>
            отмена
          </Button>
        </ButtonFormWrapper>
      </div>
    </>
  );
};
