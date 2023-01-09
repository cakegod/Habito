interface Props {
  icon: string;
  name: string;
}

function ModalTitle({ icon, name }: Props) {
  return (
    <h3 className="flex items-center text-xl font-bold">
      <span className="pr-2 text-2xl">{icon}</span>
      {name}
    </h3>
  );
}

export default ModalTitle;
