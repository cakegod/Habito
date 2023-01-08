import type { Habit } from "@data/habits";

interface Props {
  habit: Habit;
}

function Modal({ habit }: Props) {
  return (
    <>
      <input type="checkbox" id={habit.name} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex gap-2 text-xl">
            <span>{habit?.icon}</span>
            <h3 className="font-bold">{habit.name}</h3>
          </div>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor={habit.name} className="btn btn-ghost">
              Cancel
            </label>
            <label htmlFor={habit.name} className="btn btn-primary">
              Add habit
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
