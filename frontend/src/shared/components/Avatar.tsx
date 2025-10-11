interface AvatarProps {
  user?: {
    name: string;
    avatar_preset: number;
  } | null;
  avatarPreset?: number | null;
  className?: string;
}

export const Avatar = ({
  user,
  avatarPreset,
  className = "",
}: AvatarProps) => {
  // 優先順位：user > 個別プロパティ
  const presetNumber = user?.avatar_preset ?? avatarPreset;

  const avatarSrc = presetNumber
    ? `/images/avatar_user${presetNumber}.png`
    : "/images/avatar_guest.png";

  return <img src={avatarSrc} className={className} />;
};
