export function ValidateEmail(email: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) || email == '') {
    return true;
  }
  return false;
}

export function ValidatePassword(password: string) {
  if (
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password) ||
    password == ''
  ) {
    return true;
  }
  return false;
}

export function ValidateNumeric(number: string) {
  if (/(^[0-9]*$)/.test(number) || number == '') {
    return true;
  }
  return false;
}

export function ValidateLetters(string: string) {
  if (/^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/.test(string) || string == '') {
    return true;
  }
  return false;
}

export function ValidateLettersAndNumbers(string: string) {
  if (/([A-Za-z0-9])$/.test(string) || string == '') {
    return true;
  }
  return false;
}

export function ValidateDates(date1: string, date2: string) {
  const d1 = new Date(date2);
  const d2 = new Date(date1);
  if (d1 <= d2) {
    return true;
  }
  return false;
}

export function ValidateNumericFloat(number: string) {
  if (
    /^\d{0,8}(\.\d{0,8}){0,1}$/.test(number) ||
    number == '' ||
    Number.parseInt(number) < 1
  ) {
    return true;
  }
  return false;
}
