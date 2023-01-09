import type { Habit } from "@data/habits";
import CloseButton from "@components/home/CloseButton";
import ModalTitle from "@components/home/ModalTitle";
import ModalForm from "@components/home/ModalForm";
import { useStore } from "@nanostores/react";
import { currentHabit, isModalOpen } from "@stores/habits";

function Modal() {
  const $isModalOpen = useStore(isModalOpen);
  const $currentHabit = useStore(currentHabit);
  return (
    <>
      <div className={`modal ${$isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box flex max-w-md flex-col gap-2">
          <CloseButton />
          <ModalTitle name={$currentHabit.name} icon={$currentHabit.icon} />
          <ModalForm habit={$currentHabit} />
        </div>
      </div>
    </>
  );
}

export default Modal;
