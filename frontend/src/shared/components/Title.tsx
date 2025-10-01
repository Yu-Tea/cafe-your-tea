interface TitleProps {
  title: string;
  subtitle: string;
}

export const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div>
      <h1 className="text-center">{title}</h1>
      <p className="text-secondary text-center text-sm font-bold tracking-widest">
        {subtitle}
      </p>
    </div>
  );
};