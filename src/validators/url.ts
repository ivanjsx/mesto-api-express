// libraries
import { isURL } from "validator";

// interfaces
import ValidatorPropsInterface from "../interfaces/validator-props";



function validator(value: string) {
  return isURL(
    value, {
      protocols: ["http", "https"],
      require_protocol: true
    }
  );
};

function message(props: ValidatorPropsInterface) {
  return `${props.value} is not a valid URL`;
};

export default { validator, message };
