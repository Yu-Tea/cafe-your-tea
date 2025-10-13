import { Title } from "../../shared/components/Title";

const Contact = () => {
  return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center px-10">
          <div className="flex max-w-4xl flex-col items-center gap-y-8">
            <Title title="Contact" subtitle="お問い合わせ" />
  
            {/* 内容 */}
            <p>
              お問い合わせフォーム設置予定です。
            </p>
          </div>
        </div>
      </div>
    );
}

export default Contact