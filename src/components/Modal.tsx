import type { Habit } from "@data/habits";
import Button from "@components/Button";
import Label from "@components/home/Label";
import ModalButton from "./home/ModalButton";

interface Props {
  habit: Habit;
}

function Modal({ habit }: Props) {
  return (
    <>
      <input type="checkbox" id={habit.name} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex max-w-md flex-col gap-2">
          <label
            htmlFor={habit.name}
            className="btn-sm btn-circle btn absolute right-2 top-2 border-none bg-transparent text-lg"
          >
            ✕
          </label>
          <h3 className="flex items-center text-xl font-bold">
            <span className="pr-2 text-2xl">{habit.icon}</span>
            {habit.name}
          </h3>
          <form>
            <div className="form-control">
              <Label content="Time spent per day" />
              <label className="input-group">
                <input
                  type="number"
                  required
                  tabIndex={0}
                  min="0"
                  step="5"
                  placeholder="5"
                  className="input-bordered input w-full placeholder:text-base-content/50"
                />
                <select className="select bg-base-300 uppercase">
                  <option selected>minutes</option>
                  <option>hours</option>
                </select>
              </label>
            </div>
            <div className="form-control">
              <Label content="Frequency" />
              <select className="select-bordered select w-full">
                {[...Array(6)].map((_, i) => (
                  <option selected>x{i + 1} per week</option>
                ))}
                <option>Every day</option>
              </select>
            </div>
          </form>
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
