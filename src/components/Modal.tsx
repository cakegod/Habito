import type { Habit } from "@data/habits";
import ModalButton from "@components/home/ModalButton";
import CloseButton from "@components/home/CloseButton";
import ModalTitle from "@components/home/ModalTitle";
import ModalForm from "./home/ModalForm";

interface Props {
  habit: Habit;
}

function Modal({ habit }: Props) {
  return (
    <>
      <input type="checkbox" id={habit.name} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex max-w-md flex-col gap-2">
          <CloseButton forContent={habit.name} />
          <ModalTitle name={habit.name} icon={habit.icon} />
          <ModalForm />
          <div className="modal-action">
            <ModalButton intent="ghost" forContent={habit.name}>
              Cancel
            </ModalButton>
            <ModalButton intent="primary" forContent={habit.name}>
              Add habit
            </ModalButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
