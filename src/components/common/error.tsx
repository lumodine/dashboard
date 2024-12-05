export type NotFoundProps = {
  title: string;
};

export const NotFound = ({title}: NotFoundProps) => {
  return (
    <div>
      <p>{title}</p>
    </div>
  );
};
NotFound.displayName = "NotFound";
