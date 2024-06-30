import { isEmail } from "validator";

import ValidatorPropsInterface from "../interfaces/validator-props";



function validator(value: string) {
  return isEmail(
    value, {
      allow_utf8_local_part: false
    }
  );
};

function message(props: ValidatorPropsInterface) {
  return `${props.value} is not a valid email`;
};

export default { validator, message };
