interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  return (
    <div className="tw-flex tw-items-center tw-justify-between">
      <h1 className="tw-text-2xl tw-font-bold">
        {title}
      </h1>
    </div>
  );
}