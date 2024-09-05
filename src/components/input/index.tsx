type InputProps = {
  type: string;
  disabled: boolean;
};

const Input = ({ type, disabled }: InputProps) => {
  return (
    <div>
      <input type={type} disabled={disabled}></input>
    </div>
  );
};

export default Input;
