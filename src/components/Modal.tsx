import ModalForm from "@components/home/ModalForm";
import { useStore } from "@nanostores/react";
import { currentHabit, isModalOpen, toggleModal } from "@stores/habits";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

function Modal() {
  const $isModalOpen = useStore(isModalOpen);
  const $currentHabit = useStore(currentHabit);

  // TODO: transfer the small modal components here to avoid too many micro components
  return (
    <Transition
      show={$isModalOpen}
      enter="transition-opacity"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity"
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
          <Title icon={$currentHabit.icon} name={$currentHabit.name} />
          <ModalForm habit={$currentHabit} />
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}

function Title({ icon, name }: { icon: string; name: string }) {
  return (
    <Dialog.Title className="flex items-center text-xl font-bold">
      <span className="pr-2 text-2xl">{icon}</span>
      {name}
    </Dialog.Title>
  );
}

function CloseButton() {
  return (
    <button
      className="btn-sm btn-circle btn absolute right-2 top-2 border-none bg-transparent text-lg"
      onClick={() => toggleModal()}
    >
      ✕
    </button>
  );
}

export default Modal;
