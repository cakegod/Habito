import ModalLabel from "@components/home/ModalLabel";

interface Props {
  value: "" | number;
  type: "ml" | "l";
  handler: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
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
          step="50"
          placeholder="50"
          value={value}
          className="input-bordered input w-full placeholder:text-base-content/50"
          onChange={handler}
          name="value"
        />
        <select
          className="select bg-base-300 uppercase"
          value={type}
          onChange={handler}
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
