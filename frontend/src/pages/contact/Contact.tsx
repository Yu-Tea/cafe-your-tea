import { useState } from "react";
import { Title } from "@/shared/components/Title";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/Button";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // デフォルトの送信を防ぐ
    setIsSubmitting(true);

    try {
      // Googleフォームに送信
      const formDataToSend = new FormData();
      formDataToSend.append("entry.1994441084", formData.name);
      formDataToSend.append("entry.365293034", formData.email);
      formDataToSend.append("entry.2010418407", formData.message);

      await fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdfPfXmyXTFmOgXzhLxDH44mDDd_Oo3rD_Z7Cm1gDKjV_x4Hw/formResponse",
        {
          method: "POST",
          body: formDataToSend,
          mode: "no-cors", // CORSエラーを回避
        }
      );

      // 送信成功
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // フォームリセット
    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 送信完了画面
  if (isSubmitted) {
    return (
      <div className="flex justify-center p-5 sm:p-10">
        <div className="w-full max-w-xl space-y-10">
          <Title title="Thank You!" subtitle="送信完了" />

          <div className="text-center">
            送信が完了しました。
            <br />
            お問い合わせいただきありがとうございます。
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-5 sm:p-10">
      <div className="w-full max-w-xl space-y-6">
        <Title title="Contact" subtitle="お問い合わせ" />

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <InputField
            label="Name"
            type="text"
            name="name"
            maxLength={30}
            placeholder="お名前"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />

          <label
            htmlFor="message"
            className="label josefin-sans text-secondary mb-1 text-2xl font-light"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="お問い合わせ内容"
            rows={6}
            className="textarea textarea-primary w-full"
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />

          <div className="text-center">
            <Button
              variant="btn"
              type="submit"
              className="btn-primary mt-6 px-8 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "送信中..." : "送信"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
