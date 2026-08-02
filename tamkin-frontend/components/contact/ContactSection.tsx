"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactSection() {
  const t = useTranslations("contactSection");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success(t("success"));
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
          {/* ─── Heading block ─── */}
          <div className="md:col-span-2 md:sticky md:top-32">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">
              {t("subtitle")}
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[0.95] tracking-tight">
              {t("heading")}
            </h2>
            <div className="w-16 h-1.5 bg-primary-500 rounded-full mt-6 mb-6" />
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              {t("description")}
            </p>
          </div>

          {/* ─── Form ─── */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-white dark:bg-gray-800/80 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8 md:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
                >
                  {t("nameLabel")}
                </label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  required
                  className="h-10 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
                >
                  {t("emailLabel")}
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  className="h-10 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5 mt-5">
              <label
                htmlFor="contact-subject"
                className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
              >
                {t("subjectLabel")}
              </label>
              <Input
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t("subjectPlaceholder")}
                required
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-1.5 mt-5">
              <label
                htmlFor="contact-message"
                className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
              >
                {t("messageLabel")}
              </label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("messagePlaceholder")}
                required
                className="min-h-32 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={sending}
              className="w-full mt-6 h-11 rounded-xl font-bold text-sm gap-2"
            >
              {sending ? (
                t("sending")
              ) : (
                <>
                  {t("submit")}
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
