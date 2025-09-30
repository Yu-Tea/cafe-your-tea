import { useAuth } from "../../shared/contexts/AuthContext";

const myPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-2xl flex-col gap-y-10">
          <div>
            <h1>My Page</h1>
            <p className="text-secondary text-sm font-bold tracking-widest">
              {user?.name}さんのページ
            </p>
          </div>
          {/* ユーザー情報 */}
          <div className=" flex gap-x-8 text-left">
            <img src="images/avatar_user1.png" alt="アバター画像" />
            <div className="w-full">
              <div className="mt-2 mb-5 border-b-1 pb-1">
                <span className="text-3xl font-bold">{user?.name}</span>
              </div>
              <div>{user?.bio}</div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-accent px-8 text-base font-normal">
        編集
      </button>

      {/* ティーギャラリー */}
      <div className="flex items-center justify-center px-10 mt-20">
        <div className="flex w-full max-w-2xl flex-col gap-y-10">
          <div>
          <h1>Tea Gallery</h1>
          <p className="text-secondary text-sm font-bold tracking-widest">
            {user?.name}さんのティー
          </p>
          </div>
          <div>未作成です。Tea Artから作成しよう！</div>
        </div>
      </div>
    </div>
  );
};

export default myPage;
