import { serviceSelectSchema } from "@/db/schema";
import { z } from "zod";

export default function FormServicePreview({
  services,
  selectedServiceId,
}: {
  services: z.infer<typeof serviceSelectSchema>[] | null;
  selectedServiceId: string | number | null;
}) {
  const service = services?.find(
    (service) => service.id === Number(selectedServiceId)
  );

  if (!services || !service || !selectedServiceId) {
    return null;
  }

  return (
    <>
      <div className="bg-card border rounded-md p-4 font-extralight">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[auto_1fr] gap-1">
            <h4 className="font-semibold">
              {service.not_measurable ? "Starting Price: " : "Price: "}
            </h4>
            <p className="">
              {`${service.price}$`}{" "}
              {service.not_measurable ? "" : `per ${service.price_per}`}{" "}
            </p>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-1">
            <h4 className="font-semibold">Duration:</h4>
            <p>
              {service.not_measurable && `From `}
              {`${service.duration} ${service.duration_unit}`}
              {!service.not_measurable && ` per ${service.duration_per}`}
            </p>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-1">
            <h4 className="font-semibold">Can Recur:</h4>
            <p>{service.allow_recurrence ? "Yes" : "No"}</p>
          </div>
          <p>{service.description}</p>
        </div>
      </div>
      {service.not_measurable && (
        <p>
          <span className="font-bold">Note: </span>
          Please provide more information about your project in the notes
          section, and we will get back to you with a quote.
        </p>
      )}
    </>
  );
}
