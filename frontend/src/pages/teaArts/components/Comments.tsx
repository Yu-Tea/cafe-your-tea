import { Title } from "../../../shared/components/Title";

const Comments = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-y-6 px-5">
        <Title title="Comments" subtitle="ティーを飲んだ方のご感想" />
        <div className="sm:border-secondary/20 w-full max-w-3xl space-y-3 rounded-xl py-4 sm:border-1 sm:px-8">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10">
                <img alt="アバター画像" src="../images/avatar_user1.png" />
              </div>
            </div>
            <div className="chat-header text-secondary">
              てすと名前さん
              <span className="opacity-50">2025/10/23 12:45</span>
            </div>
            <div className="chat-bubble max-w-full px-5 py-4 text-sm">
              あいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこあいうえおかきくけこ
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="../images/avatar_user2.png"
                />
              </div>
            </div>
            <div className="chat-header text-secondary">
              てすと名前さん
              <span className="opacity-50">2025/10/23 12:45</span>
            </div>
            <div className="chat-bubble max-w-full px-5 py-4 text-sm">
              テストの文章です。テストの文章です。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
