import CloseButton from "@components/home/CloseButton";
import ModalForm from "@components/home/ModalForm";
import { useStore } from "@nanostores/react";
import { currentHabit, isModalOpen } from "@stores/habits";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

function Modal() {
  const $isModalOpen = useStore(isModalOpen);
  const $currentHabit = useStore(currentHabit);

  return (
    <Transition
      show={$isModalOpen}
			enter="transition-opacity duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
      as={Fragment}
    >
      <Dialog
        className="modal modal-open"
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
    </Transition>
  );
}

export default Modal;
