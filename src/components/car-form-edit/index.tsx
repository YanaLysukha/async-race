import Button from '../button';
import Input from '../input';
import './style.scss';

const CarFormEdit = () => {
  return (
    <div className="form-wrapper">
      <Input type="text" placeholder="Car Name"></Input>
      <Input type="color"></Input>
      <Button text="Edit car" classes="basic"></Button>
    </div>
  );
};

export default CarFormEdit;
