export interface User {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  id?: string;
  driver?: {
    vehicleAllotments: {
      id?: string;
      vehicle: Car;
    }[];
  };
}

export interface Car {
  manufacturer: string;
  model: string;
  registrationNumber: string;
  id?: string;
  vin?: string;
}

export class Formatters {
  static formatISODate(isoDate: string | Date) {
    if (!isoDate) return '-';
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

  static convertDateFormat(dateStr: string) {
    if (!dateStr) return '-';
    const dateParts = dateStr.split('-');

    return dateParts.reverse().join('.');
  }

  static nameFormatter(user: User, withPlaceholder = true) {
    const placeholder = withPlaceholder ? '-' : '';
    if (!user) return placeholder;
    const name = user.firstName ? `${user.firstName} ` : '';
    const middleName = user.middleName ?? '';
    const lastName = user.lastName ? `${user.lastName} ` : '';

    if (!name.length && !middleName.length && !lastName.length) return placeholder;

    return `${lastName} ${name} ${middleName}`;
  }

  static carNameFormatter(car: Car, withoutRegistrationNumber = false) {
    if (!car) return '-';

    if (withoutRegistrationNumber) {
      return `${car.manufacturer} ${car.model}`;
    } else {
      return `${car.manufacturer} ${car.model} ${car.registrationNumber}`;
    }
  }

  static parseISO8601Duration(isoDuration: string) {
    if (!isoDuration) return null;
    const regex = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = isoDuration.match(regex);

    return {
      hours: parseInt(matches[4])
        ? parseInt(matches[4]).toString().length === 1
          ? `0${parseInt(matches[4])}`
          : parseInt(matches[4])
        : '00',
      minutes: parseInt(matches[5])
        ? parseInt(matches[5]).toString().length === 1
          ? `0${parseInt(matches[5])}`
          : parseInt(matches[5])
        : '00',
      seconds: parseInt(matches[6])
        ? parseInt(matches[6]).toString().length === 1
          ? `0${parseInt(matches[6])}`
          : parseInt(matches[6])
        : '00',
    };
  }

  static removeExtraSpaces(str: string) {
    return str.replace(/\s+/g, ' ').trim();
  }
}