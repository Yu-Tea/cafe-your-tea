import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

interface HelpModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const HelpModal = ({ id, title, children }: HelpModalProps) => {
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのみ Portal を使う
  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute top-2.5 right-2.5"
            onClick={() => {
              const modal = document.getElementById(
                id
              ) as HTMLDialogElement | null;
              modal?.close();
            }}
          >
            <MdClose size={20} />
          </button>
        </form>

        <h3 className="text-accent mt-1 mb-2 flex items-center text-lg font-bold">
          <FaRegCircleQuestion className="mr-1" />
          {title}
        </h3>

        <div className="prose max-w-none">
          <ul className="mt-3 list-disc space-y-2 pl-4 text-sm">{children}</ul>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          type="button"
          onClick={() => {
            const modal = document.getElementById(
              id
            ) as HTMLDialogElement | null;
            modal?.close();
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );

  return (
    <>
      {/* ？ボタン */}
      <button
        type="button"
        className="btn btn-link hover:text-accent/60 btn-xs link-accent pb-1"
        onClick={() => {
          const modal = document.getElementById(id) as HTMLDialogElement;
          modal?.showModal();
        }}
      >
        <FaRegCircleQuestion size={18} />
      </button>

      {/* モーダルを body 直下にレンダリング */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
};
