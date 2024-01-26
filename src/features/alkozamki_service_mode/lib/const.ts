export enum EventType {
  APP_ACKNOWLEDGED = 'APP_ACKNOWLEDGED',
}

export enum RequestType {
  SERVER_REQUEST = 'SERVER_REQUEST',
}

export enum ServiceModeInfoActionTypes {
  SERVICE_MODE_DEACTIVATE = 'SERVICE_MODE_DEACTIVATE',
  SERVICE_MODE_ACTIVATE = 'SERVICE_MODE_ACTIVATE',
}

export enum ServiceModeInfoType {
  SERVER_REQUEST = 'SERVER_REQUEST',
  APP_REQUEST = 'APP_REQUEST',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  OFFLINE_DEACTIVATION = 'OFFLINE_DEACTIVATION',
  OFFLINE_ACTIVATION = 'OFFLINE_ACTIVATION',
}

export enum ServiceModeInfoRequestType {
  APP_REQUEST = 'APP_REQUEST',
  SERVER_REQUEST = 'SERVER_REQUEST',
}

export enum DriverOperatorState {
  OFFLINE_SWITCH = 'OFFLINE_SWITCH',
  DRIVER_WAITING = 'DRIVER_WAITING',
  OPERATOR_WAITING = 'OPERATOR_WAITING',
  DRIVER_ACCEPT = 'DRIVER_ACCEPT',
  DRIVER_CANCEL = 'DRIVER_CANCEL',
}

export enum OperatorAction {
  SWITCHING_ON = 'SWITCHING_ON',
  SWITCHING_OFF = 'SWITCHING_OFF',
}