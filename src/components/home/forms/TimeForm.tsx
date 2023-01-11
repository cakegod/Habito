import ModalLabel from "@components/home/ModalLabel";
import type { HabitData } from "../ModalForm";

interface Props {
  value: "" | number;
  type: "minutes" | "hours";
  handler: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    type: keyof HabitData
  ) => void;
}

function TimeForm({ value, type, handler }: Props) {
  return (
    <div className="form-control">
      <ModalLabel content="Time spent" />
      <label className="input-group">
        <input
          type="number"
          required
          tabIndex={0}
          min="0"
          step="1"
          placeholder="5"
          value={value}
          className="input-bordered input w-full placeholder:text-base-content/50"
          onChange={(e) => handler(e, "time")}
          name="value"
        />
        <select
          className="select bg-base-300 uppercase"
          value={type}
          onChange={(e) => handler(e, "time")}
          name="type"
        >
          <option value="minutes">minutes</option>
          <option value="hours">hours</option>
        </select>
      </label>
    </div>
  );
}

export default TimeForm;
