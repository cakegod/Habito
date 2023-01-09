import { useStore } from "@nanostores/react";
import { toggleModal } from "@stores/habits";

function CloseButton() {
  return (
    <button
      className="btn-sm btn-circle btn absolute right-2 top-2 border-none bg-transparent text-lg"
      onClick={toggleModal}
    >
      ✕
    </button>
  );
}

export default CloseButton;
