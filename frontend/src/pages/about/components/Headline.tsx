interface HeadlineProps {
  title: string;
  subtitle: string;
  bg: string;
}

const Headline = ({ title, subtitle, bg }: HeadlineProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(/images/${bg}.png)`,
      }}
      className="flex items-center justify-center bg-cover bg-fixed py-6 mt-8"
    >
      <div className="text-center pb-5">
        <h1>{title}</h1>
        <div className="text-secondary text-sm font-bold tracking-widest">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default Headline;
