import { Title } from "../../shared/components/Title";

const About = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-center px-10">
        <div className="flex max-w-4xl flex-col items-center gap-y-8">
          <Title title="About" subtitle="このカフェについて" />

          {/* 内容 */}
          <p>
            アプリの世界観や遊び方などの説明文章を掲載。アプリの世界観や遊び方などの説明文章を掲載。アプリの世界観や遊び方などの説明文章を掲載。アプリの世界観や遊び方などの説明文章を掲載。アプリの世界観や遊び方などの説明文章を掲載。アプリの世界観や遊び方などの説明文章を掲載。アプリの世界観や遊び方などの説明文章を掲載。アプリの世界観や遊び方などの説明文章を掲載。
          </p>

          <p>
            利用規約・プライバシーポリシー・お問い合わせへの案内もこのページで行う。利用規約・プライバシーポリシー・お問い合わせへの案内もこのページで行う。利用規約・プライバシーポリシー・お問い合わせへの案内もこのページで行う。利用規約・プライバシーポリシー・お問い合わせへの案内もこのページで行う。
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
