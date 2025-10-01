import { User } from "../../types/user";

interface AvatarProps {
  user: User | null; // 既存のUser型を使用
  className?: string;
}

export const Avatar = ({
  user,

  className = "",
}: AvatarProps) => {
  // アバター画像のパスを生成
  const avatarSrc = user?.avatar_preset
    ? `/images/avatar_user${user.avatar_preset}.png`
    : "/images/avatar_guest.png";

  const altText = user?.name ? `${user.name}のアバター` : "ゲストアバター";

  return <img src={avatarSrc} alt={altText} className={`${className}`} />;
};
