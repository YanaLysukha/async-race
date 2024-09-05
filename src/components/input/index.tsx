import './style.scss';

type InputProps = {
  type: string;
  disabled?: boolean;
  placeholder?: string;
};

const Input = ({ type, disabled, placeholder }: InputProps) => {
  return (
    <div>
      <input className="input" type={type} disabled={disabled} placeholder={placeholder}></input>
    </div>
  );
};

export default Input;
