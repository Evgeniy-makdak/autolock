import { useEffect, useState } from 'react';

import { EventsHistory, HistoryTypes } from '@features/events_history';
import { userStore } from '@features/menu_button/model/store';
import { useToggle } from '@shared/hooks/useToggle';
import { selectedBranchStore } from '@shared/model/selected_branch/store';
import { AlkozamkiInfo } from '@widgets/alkozamki_info';

import { alkozamkiStore } from '../model/store';

export const useAlkozamki = () => {
  const [selectedAlcolockId, setSelectedAlcolockId] = useState(null);
  const [updateInfo, toggleUpdateInfo] = useToggle();
  const [updateTable, toggleUpdateTable] = useToggle();
  const loading = alkozamkiStore.alkozamkiLoading.useValue();
  const selectedBranch = selectedBranchStore.selectedBranch.useValue();

  const userData = userStore.userData.useValue();

  const onClickRow = (id: string) => setSelectedAlcolockId(id);
  const handleCloseAside = () => setSelectedAlcolockId(null);

  const afterDelete = (id: string) => {
    if (id === selectedAlcolockId) {
      handleCloseAside();
    }
  };

  const afterEdit = (id: string) => {
    if (id === selectedAlcolockId) {
      toggleUpdateInfo();
    }
  };

  // TODO => нужно ли это ?
  useEffect(() => {
    setInterval(() => {
      toggleUpdateTable();
      toggleUpdateInfo();
    }, 60000);
  }, []);

  const tabs = [
    {
      name: 'ИНФО',
      content: (
        <AlkozamkiInfo
          updateData={updateInfo}
          toggleUpdateInfo={toggleUpdateInfo}
          selectedAlcolockId={selectedAlcolockId}
          toggleUpdateTable={toggleUpdateTable}
        />
      ),
    },
    {
      name: 'ИСТОРИЯ',
      content: <EventsHistory type={HistoryTypes.byAlcolock} id={selectedAlcolockId} />,
    },
  ];

  return {
    loading,
    selectedBranch,
    userData,
    tabs,
    updateTable,
    selectedAlcolockId,
    onClickRow,
    afterDelete,
    afterEdit,
    handleCloseAside,
  };
};