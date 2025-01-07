import EmailContactForm from "@/components/forms/EmailContactForm/EmailContactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* <h1 className="text-4xl font-bold">Contact us!</h1> */}
      <div className="relative flex flex-col items-center justify-between w-full min-h-full md:flex-row">
        <Divider className="hidden md:block top-1/2 z-[5] left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="flex flex-col justify-center w-full p-6 px-20 border-b grow md:h-full md:border-b-0 md:border-x">
          <p>
            Occaecat fugiat ad ex mollit aliquip. Aliquip aute sunt cillum qui
            quis veniam cillum eu exercitation dolor minim irure. Deserunt amet
            laborum ut anim nisi velit.
          </p>
        </div>
        <div className="relative flex flex-col justify-center w-full h-auto p-6 px-20 border-t grow md:h-full md:border-t-0 dark:bg-black bg-stone-50 border-x">
          <Divider className="block transform -translate-x-1/2 md:hidden -top-4 left-1/2" />
          <h2 className="mb-10 text-2xl font-semibold text-center md:-mt-20">
            Contact Us!
          </h2>
          <EmailContactForm />
        </div>
      </div>
    </div>
  );
}

function Divider({ className }: { className?: string }) {
  return (
    <div
      className={`absolute select-none dark:bg-black bg-stone-50  bg-secondary border rounded-md px-4 py-1 ${className}`}
    >
      or
    </div>
  );
}
