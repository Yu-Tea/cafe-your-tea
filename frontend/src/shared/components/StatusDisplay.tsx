interface StatusDisplayProps {
  type: "loading" | "error" | "empty";
  message?: string;
  className?: string;
}

const StatusDisplay = ({
  type,
  message,
  className = "container mx-auto pt-30 text-center",
}: StatusDisplayProps) => {
  const getDefaultMessage = () => {
    switch (type) {
      case "error":
        return "エラーが発生しました";
      case "empty":
        return "データが見つかりません";
      default:
        return "";
    }
  };

  const displayMessage = message || getDefaultMessage();

  // ローディング状態
  if (type === "loading") {
    return (
      <div className={className}>
        <span className="loading loading-ring text-neutral loading-xl"></span>
      </div>
    );
  }

  // エラー状態
  if (type === "error") {
    return (
      <div className={className}>
        <div className="alert alert-error mx-auto max-w-md">
          <span>{displayMessage}</span>
        </div>
      </div>
    );
  }

  // 空データ状態
  if (type === "empty") {
    return (
      <div className={className}>
        <div className="alert alert-info mx-auto max-w-md">
          <span>{displayMessage}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default StatusDisplay;
