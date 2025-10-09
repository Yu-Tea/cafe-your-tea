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
      <span className="loading loading-ring text-neutral loading-xl"></span>
    );
  }

  // エラー状態
  if (type === "error") {
    return (
      <div className="alert alert-error mx-auto max-w-md">
        <span>{displayMessage}</span>
      </div>
    );
  }

  // 空データ状態
  if (type === "empty") {
    return (
      <div className="alert alert-info mx-auto max-w-md">
        <span>{displayMessage}</span>
      </div>
    );
  }

  return null;
};

export default StatusDisplay;
