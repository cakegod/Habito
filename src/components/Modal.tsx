import type { Habit } from "@data/habits";

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
          <div className="flex gap-2 text-xl">
            <span>{habit.icon}</span>
            <h3 className="font-bold">{habit.name}</h3>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">How long?</span>
            </label>
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
          <div className="modal-action">
            <label htmlFor={habit.name} className="btn-ghost btn uppercase">
              Cancel
            </label>
            <label htmlFor={habit.name} className="btn-primary btn uppercase">
              Add habit
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
