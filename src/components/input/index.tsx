import './style.scss';

type InputProps = {
  type: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, value, disabled, placeholder, onChange }: InputProps) => {
  return (
    <div>
      <input
        className="input"
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
