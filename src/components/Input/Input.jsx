import { InputSpace, TextareaSpace } from "./InputStyled";

export function Input({
  type,
  placeholder,
  name,
  register,
  isInput = true,
  defaultValue,
  disabled,
}) {
  let inputProps = {
    type,
    placeholder,
    ...register(name),
    defaultValue,
    disabled,
  };

  return (
    <>
      {isInput ? (
        <InputSpace {...inputProps} />
      ) : (
        <TextareaSpace {...inputProps} />
      )}
    </>
  );
}
