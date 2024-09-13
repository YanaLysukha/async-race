import './style.scss';

type InputProps = {
  type: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, disabled, placeholder, onChange }: InputProps) => {
  return (
    <div>
      <input
        className="input"
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
