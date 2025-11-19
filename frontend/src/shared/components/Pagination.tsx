import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface PaginationProps {
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
    next_page: number | null;
    prev_page: number | null;
  };
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }:PaginationProps) => {
  const { current_page, total_pages, prev_page, next_page } = pagination;

  // ページネーションが不要な場合は非表示
  if (total_pages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, current_page - Math.floor(maxVisible / 2));
    const endPage = Math.min(total_pages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // 最初のページを表示
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className="join-item btn btn-ghost btn-square"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pages.push(
          <button
            key="start-ellipsis"
            className="join-item btn btn-disabled btn-ghost"
          >
            ...
          </button>
        );
      }
    }

    // 中間のページ番号
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`join-item btn btn-square ${i === current_page ? "btn-active btn-neutral" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // 最後のページを表示
    if (endPage < total_pages) {
      if (endPage < total_pages - 1) {
        pages.push(
          <button
            key="end-ellipsis"
            className="join-item btn btn-disabled btn-ghost"
          >
            ...
          </button>
        );
      }

      pages.push(
        <button
          key={total_pages}
          className="join-item btn btn-square btn-ghost"
          onClick={() => onPageChange(total_pages)}
        >
          {total_pages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="josefin-sans mt-8 flex flex-col items-center space-y-4">
      {/* ページネーション */}
      <div className="join">
        {/* 前へボタン */}
        <button
          className="join-item btn btn-ghost btn-square"
          disabled={!prev_page}
          onClick={() => onPageChange(prev_page!)}
        >
          <MdOutlineArrowBackIos />
        </button>

        {/* ページ番号 */}
        {renderPageNumbers()}

        {/* 次へボタン */}
        <button
          className="join-item btn btn-ghost btn-square"
          disabled={!next_page}
          onClick={() => onPageChange(next_page!)}
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
