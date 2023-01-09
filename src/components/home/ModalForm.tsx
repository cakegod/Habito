import ModalLabel from "@components/home/ModalLabel";

function ModalForm() {
  return (
    <form>
      <div className="form-control">
        <ModalLabel content="Time spent per day" />
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
        <ModalLabel content="Frequency" />
        <select className="select-bordered select w-full">
          <option selected>x1 per week</option>
          <option>x2 per week</option>
          <option>x3 per week</option>
          <option>x4 per week</option>
          <option>x5 per week</option>
          <option>x6 per week</option>
          <option>Every day</option>
        </select>
      </div>
    </form>
  );
}

export default ModalForm;
