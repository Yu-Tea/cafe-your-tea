import { Title } from "../../shared/components/Title";

const NotFoundPage = () => {
  return (
    <div className="space-y-8 p-5 sm:p-10">
      <Title title="SORRY" subtitle="page not found" />
      <p className="text-center">お探しのページは見つかりませんでした。</p>
    </div>
  );
};

export default NotFoundPage;
