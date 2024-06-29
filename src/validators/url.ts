import { isURL } from "validator";

interface ValidatorPropsInterface {
  value: string;
};

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
