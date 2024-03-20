import type { Dayjs } from 'dayjs';
import { create } from 'zustand';

interface UsersTableStore {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  changeStartDate: (date: Dayjs) => void;
  changeEndDate: (date: Dayjs) => void;
  clearDates: () => void;
}

export const useUsersTableStore = create<UsersTableStore>()((set) => ({
  startDate: null,
  endDate: null,
  changeStartDate: (date) => set(() => ({ startDate: date })),
  changeEndDate: (date) => set(() => ({ endDate: date })),
  clearDates: () => set(() => ({ endDate: null, startDate: null })),
}));