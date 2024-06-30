// libraries
import { isStrongPassword } from "validator";

// interfaces
import ValidatorPropsInterface from "../interfaces/validator-props";

// options
const minLength = 8;
const minLowercase = 1;
const minUppercase = 0;
const minNumbers = 1;
const minSymbols = 0;



function validator(value: string) {
  return isStrongPassword(
    value, {
      minLength,
      minLowercase,
      minUppercase,
      minNumbers,
      minSymbols
    }
  );
};

function pluralize(word: string, count: number) {
  return count === 1 ? word : `${word}s`;
};

function message(props: ValidatorPropsInterface) {
  const messages: Array<string> = [];
  if (minLength) {
    messages.push(`at least ${minLength} ${pluralize("character", minLength)}`);
  };
  if (minLowercase) {
    messages.push(`at least ${minLowercase} ${pluralize("lowercase letter", minLowercase)}`);
  };
  if (minUppercase) {
    messages.push(`at least ${minUppercase} ${pluralize("uppercase letter", minUppercase)}`);
  };
  if (minNumbers) {
    messages.push(`at least ${minNumbers} ${pluralize("number", minNumbers)}`);
  };
  if (minSymbols) {
    messages.push(`at least ${minSymbols} ${pluralize("symbol", minSymbols)}`);
  };
  return `${props.value} is not strong enough. Password must contain ${messages.join(", ")}.`;
};

export default { validator, message };
