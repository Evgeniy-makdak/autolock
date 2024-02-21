import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Divider, Menu, MenuItem, Button as MuiButton } from '@mui/material';

import { PasswordForm } from '@entities/password_form';
import { testids } from '@shared/const/testid';
import { useToggle } from '@shared/hooks/useToggle';
import { Button, ButtonsType } from '@shared/ui/button';
import { Popup } from '@shared/ui/popup';

import { changePassword, logout } from '../model/effects';
import { changePasswordFormSelectors } from '../model/forms';
import { userStore } from '../model/store';

const ActionTypes = {
  exit: 'exit',
  profileEdit: 'profileEdit',
};

export const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, toggleModal] = useToggle();
  const open = !!anchorEl;
  const user = userStore.userData.useValue();
  const resetForm = changePasswordFormSelectors.useResetForm();
  const isValidForm = changePasswordFormSelectors.useIsFormValid();
  const onClickSubmit = changePasswordFormSelectors.useOnClickSubmit();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type) => {
    switch (type) {
      case ActionTypes.profileEdit:
        toggleModal();
        break;
      case ActionTypes.exit:
        logout(navigate);
        break;
    }

    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    toggleModal();
    resetForm();
  };

  const onSubmit = () => {
    if (!isValidForm) return;

    onClickSubmit();
  };

  const handleChangePassword = (data) => {
    changePassword(data)
      .then(() => {
        handleCloseModal();
      })
      .catch((err) => {
        console.log('ChangePassword error', err?.response);
      });
  };

  return (
    <div>
      <MuiButton
        data-testid={testids.widget_navbar.NAVBAR_POPUP_BUTTON}
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          background: '#667A8A',
          color: 'white',
          padding: '9px 18px',
          '&:hover': {
            background: '#667A8A',
          },
          justifyContent: 'flex-start',
          overflow: 'hidden',
          maxWidth: '100%',
          span: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          },
        }}>
        <span>{user?.email ?? '-'}</span>
        <ArrowDropDownIcon
          sx={{
            transform: `rotate(${open ? 180 : 0}deg)`,
            transition: 'all .15s ease',
          }}
        />
      </MuiButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          data-testid={testids.widget_navbar.NAVBAR_POPUP_CHANGE_PASSWORD_BUTTON}
          onClick={() => handleClose(ActionTypes.profileEdit)}>
          Изменить пароль
        </MenuItem>

        <Divider />

        <MenuItem
          data-testid={testids.widget_navbar.NAVBAR_POPUP_CHANGE_EXIT_BUTTON}
          onClick={() => handleClose(ActionTypes.exit)}>
          Выйти
        </MenuItem>
      </Menu>

      <Popup
        isOpen={openModal}
        toggleModal={toggleModal}
        closeonClickSpace={false}
        headerTitle={'Изменение пароля'}
        body={
          <PasswordForm
            formSelectors={changePasswordFormSelectors}
            onValidSubmit={handleChangePassword}
          />
        }
        onCloseModal={handleCloseModal}
        buttons={[
          <Button
            key={'action_1'}
            typeButton={ButtonsType.action}
            disabled={!isValidForm}
            onClick={onSubmit}>
            Сохранить
          </Button>,
          <Button key={'action_2'} typeButton={ButtonsType.action} onClick={handleCloseModal}>
            Отменить
          </Button>,
        ]}
      />
    </div>
  );
};
