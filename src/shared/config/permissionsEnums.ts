export const API_URL = process.env.REACT_APP_API_URL;

export const InputSearchDelay = 700;

export enum PermissionsLabel {
  READ = 'Чтение',
  EDIT = 'Запись',
  DELETE = 'Удаление',
  CREATE = 'Создание',
  NO = 'Недоступно',
}

export enum Entities {
  EVENT = 'EVENT',
  USER = 'USER',
  DEVICE = 'DEVICE',
  VEHICLE = 'VEHICLE',
  ATTACHMENT = 'ATTACHMENT',
  ROLE = 'ROLE',
  GROUP = 'GROUP',
}

export enum Permissions {
  PERMISSION_VEHICLE_READ = `PERMISSION_VEHICLE_READ`,
  PERMISSION_VEHICLE_CREATE = `PERMISSION_VEHICLE_CREATE`,
  PERMISSION_VEHICLE_EDIT = 'PERMISSION_VEHICLE_EDIT',
  PERMISSION_VEHICLE_DELETE = `PERMISSION_VEHICLE_DELETE`,

  PERMISSION_EVENTS_READ = 'PERMISSION_EVENTS_READ',

  SYSTEM_GLOBAL_ADMIN = 'SYSTEM_GLOBAL_ADMIN',

  PERMISSION_ROLE_DELETE = `PERMISSION_ROLE_DELETE`,
  PERMISSION_ROLE_READ = `PERMISSION_ROLE_READ`,
  PERMISSION_ROLE_CREATE = `PERMISSION_ROLE_CREATE`,
  PERMISSION_ROLE_EDIT = 'PERMISSION_ROLE_EDIT',

  PERMISSION_DEVICE_DELETE = `PERMISSION_DEVICE_DELETE`,
  PERMISSION_DEVICE_READ = `PERMISSION_DEVICE_READ`,
  PERMISSION_DEVICE_CREATE = `PERMISSION_DEVICE_CREATE`,
  PERMISSION_DEVICE_EDIT = 'PERMISSION_DEVICE_EDIT',

  PERMISSION_USER_DELETE = `PERMISSION_USER_DELETE`,
  PERMISSION_USER_CREATE = `PERMISSION_USER_CREATE`,
  PERMISSION_USER_READ = `PERMISSION_USER_READ`,
  PERMISSION_USER_EDIT = 'PERMISSION_USER_EDIT',

  PERMISSION_ATTACHMENTS_DELETE = `PERMISSION_ATTACHMENTS_DELETE`,
  PERMISSION_ATTACHMENTS_CREATE = `PERMISSION_ATTACHMENTS_CREATE`,
  PERMISSION_ATTACHMENTS_READ = `PERMISSION_ATTACHMENTS_READ`,
  PERMISSION_ATTACHMENTS_EDIT = 'PERMISSION_ATTACHMENTS_EDIT',
}

export enum PermissionsStatus {
  NO_PERMISSION,
  READ,
  EDIT,
  CREATE,
  DELETE,
}