import type { Habit } from "@data/habits";
import CloseButton from "@components/home/CloseButton";
import ModalTitle from "@components/home/ModalTitle";
import ModalForm from "@components/home/ModalForm";
import { useStore } from "@nanostores/react";
import { isModalOpen } from "@stores/habits";

interface Props {
  habit: Habit;
}

function Modal({ habit }: Props) {
  const $isModalOpen = useStore(isModalOpen);

  return (
    <>
      <div className={`modal ${$isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box flex max-w-md flex-col gap-2">
          <CloseButton />
          <ModalTitle name={habit.name} icon={habit.icon} />
          <ModalForm />
        </div>
      </div>
    </>
  );
}

export default Modal;
