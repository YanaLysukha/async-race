import './style.scss';

type WinnerModalProps = {
  name: string;
  time: number;
};

const WinnerModal = ({ name, time }: WinnerModalProps) => {
  return (
    <div className="modal-container">
      <p className="modal-message">
        Winner is {name} - {time}
      </p>
    </div>
  );
};

export default WinnerModal;
