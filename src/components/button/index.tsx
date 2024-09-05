import './style.scss';

type ButtonProps = {
  text?: string;
  classes?: string;
  onClickHandler?: () => void;
  children?: React.ReactElement | React.ReactElement[];
  disabled?: boolean;
};

const Button = ({ text, classes, onClickHandler, children, disabled }: ButtonProps) => {
  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClickHandler}>
      {children}
      {text}
    </button>
  );
};

export default Button;
