export const isEmail = (email:string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPasswordStrong = (password:string) => {
  // At least 8 characters, at most 20 characters
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character (!@#$%^&*)
  var regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&_*]{8,20}$/;

  return regex.test(password);
};

export const extractDate = (input: string): string | null => {
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T/;
  const match = input.match(dateRegex);
  
  if (match) {
      const year = match[1];
      const month = match[2];
      const day = match[3];
      return `${day}/${month}/${year}`;
  } else {
      return null;
  }
}