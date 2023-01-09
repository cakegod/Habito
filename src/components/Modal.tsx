import CloseButton from "@components/home/CloseButton";
import ModalForm from "@components/home/ModalForm";
import { useStore } from "@nanostores/react";
import { currentHabit, isModalOpen } from "@stores/habits";
import { Dialog } from "@headlessui/react";

function Modal() {
  const $isModalOpen = useStore(isModalOpen);
  const $currentHabit = useStore(currentHabit);

  return (
    <Dialog
      className="modal modal-open"
      open={$isModalOpen}
      onClose={() => isModalOpen.set(false)}
    >
      <Dialog.Panel className="modal-box flex max-w-md flex-col gap-2">
        <CloseButton />
        <Dialog.Title className="flex items-center text-xl font-bold">
          <span className="pr-2 text-2xl">{$currentHabit.icon}</span>
          {$currentHabit.name}
        </Dialog.Title>
        <ModalForm habit={$currentHabit} />
      </Dialog.Panel>
    </Dialog>
  );
}

export default Modal;
