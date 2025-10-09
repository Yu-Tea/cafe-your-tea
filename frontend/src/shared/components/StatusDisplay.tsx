interface StatusDisplayProps {
  type: "loading" | "error" | "empty";
  message?: string;
}

const StatusDisplay = ({ type, message }: StatusDisplayProps) => {
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
      <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center">
        <span className="loading loading-ring text-neutral loading-xl"></span>
      </div>
    );
  }

  // エラー状態
  if (type === "error") {
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center">
        <div className="alert alert-error mx-auto max-w-md">
          <span>{displayMessage}</span>
        </div>
      </div>
    );
  }

  // 空データ状態
  if (type === "empty") {
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center">
        <div className="alert alert-info mx-auto max-w-md">
          <span>{displayMessage}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default StatusDisplay;
