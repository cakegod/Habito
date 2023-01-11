import ModalLabel from "@components/home/ModalLabel";
import type { HabitData } from "../ModalForm";

interface Props {
  value: "" | number;
  type: "ml" | "l";
  handler: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    type: keyof HabitData
  ) => void;
}

function LiquidForm({ value, type, handler }: Props) {
  return (
    <div className="form-control">
      <ModalLabel content="Liquid drank per day" />
      <label className="input-group">
        <input
          type="number"
          required
          tabIndex={0}
          min="0"
          step="1"
          placeholder="50"
          value={value}
          className="input w-full bg-base-200 placeholder:text-base-content/50"
          onChange={(e) => handler(e, "liquid")}
          name="value"
        />
        <select
          className="select bg-base-300 uppercase"
          value={type}
          onChange={(e) => handler(e, "liquid")}
          name="type"
        >
          <option value="ml">ml</option>
          <option value="l">l</option>
        </select>
      </label>
    </div>
  );
}

export default LiquidForm;
