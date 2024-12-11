import MainHeader from "@/components/layout/MainHeader/MainHeader";
import Mainfooter from "@/components/layout/MainFooter/Mainfooter";
import MessageAssistantButton from "@/components/layout/MessageAssistantButton/MessageAssistantButton";

export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="
      grid
      grid-cols-main
      grid-rows-[auto_1fr_auto]
      min-h-full
    "
    >
      <MainHeader />

      <main className="relative col-start-2 col-end-3">
        {children}

        <MessageAssistantButton />
      </main>

      <Mainfooter />
    </section>
  );
}
