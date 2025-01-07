"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  addressSelectSchema,
  commisionFormSchema,
  recurrenceSchema,
  serviceSelectSchema,
} from "@/db/schema";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { InputWithLabel } from "@/components/inputs/InputWithLabel/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel/SelectWithLabel";
import DatePicker from "@/components/inputs/DatePicker/DatePicker";
import { capitalizeFirstWord, makePlural } from "@/lib/utils";
import AddressPreview from "@/components/AddressPreview/AddressPreview";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel/TextAreaWithLabel";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import NewAddressDialog from "@/components/NewAddressDialog/NewAddressDialog";
import { FileInputWithLabel } from "@/components/inputs/FileInputWithLabel/FileInputWIthLabel";
import { ACCEPTED_FILE_TYPES } from "@/lib/constants";
import FileInputImagesPreview from "@/components/FileInputImagesPreview/FileInputImagesPreview";
import FormServicePreview from "@/components/FormServicePreview/FormServicePreview";
import { useMemo } from "react";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel/CheckboxWithLabel";

const formSchema = commisionFormSchema.extend({
  images_names: z.union([
    z.null(),
    z.instanceof(FileList),
    z.array(z.instanceof(File)),
  ]),
});

// TODO: add check if date and time are available
export default function CommissionForm({
  defaultValues,
  services,
  addresses,
  onSubmit,
}: {
  defaultValues?: z.infer<typeof formSchema>;
  services: z.infer<typeof serviceSelectSchema>[];
  addresses: z.infer<typeof addressSelectSchema>[];
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  const { user } = useKindeAuth();

  // TODO: add fetching addresses on the client side with tanstack query,
  // so when user adds a new address it will be available in the form

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      is_recurring: false,
      user_id: user?.id,
      same_address: true,
      start_date: new Date(),
      images_names: null,
      start_time: new Date(),
      units: 0,
    },
  });

  const selectedAddressId = form.watch("address_id");
  const selectedAddress = useMemo(
    () =>
      addresses.find((address) => address.id === Number(selectedAddressId)) ||
      null,
    [addresses, selectedAddressId]
  );

  const selectedServiceId = form.watch("service_id");

  const selectedService = useMemo(
    () => services.find((service) => service.id === Number(selectedServiceId)),
    [services, selectedServiceId]
  );

  const unitsValue = form.watch("units");

  const images = form.watch("images_names");

  return (
    <Form {...form}>
      <form
        className="flex items-stretch w-full gap-8 justify-center flex-col md:max-w-[900px]  rounded-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <InputWithLabel<z.infer<typeof formSchema>>
          fieldLabel="Name"
          fieldDescription="Your name for this commission."
          nameInSchema="name"
          wrapperClassName="w-full"
        />
        <div className="flex items-start gap-8 w-full">
          <SelectWithLabel<z.infer<typeof formSchema>>
            fieldLabel="Service Type"
            nameInSchema="service_id"
            wrapperClassName="w-full"
            fieldDescription="Type of service you would like to commission."
            data={services.map((service) => ({
              value: service.id.toString(),
              label: service.name,
            }))}
          />
        </div>

        <FormServicePreview
          services={services}
          selectedServiceId={form.watch("service_id")}
        />

        {selectedService && !selectedService?.not_measurable && (
          <div className="flex items-center gap-8 w-full">
            <InputWithLabel<z.infer<typeof formSchema>>
              fieldLabel={`Number of ${makePlural(selectedService?.price_per)}`}
              fieldDescription={
                <CheckboxWithLabel
                  fieldLabel="I don't know"
                  nameInSchema="unknown_units"
                  labelClassName="m-0"
                />
              }
              // fieldDescription="Provide the size or number of units for the service."
              nameInSchema="units"
              type="number"
              wrapperClassName="w-full"
            />

            <div className="w-full">
              <p className="whitespace-nowrap">
                Total price: {Number(selectedService.price) * (unitsValue || 0)}
                ${" "}
              </p>
            </div>
          </div>
        )}

        {selectedService?.allow_recurrence && (
          <SelectWithLabel<z.infer<typeof formSchema>>
            fieldLabel="Recurring"
            nameInSchema="reccurence"
            wrapperClassName="w-full"
            fieldDescription="Want to have this commission done regularly?"
            data={recurrenceSchema.options.map((option) => ({
              value: option,
              label: capitalizeFirstWord(option),
            }))}
          />
        )}

        <div className="flex items-center gap-8 w-full">
          <DatePicker<z.infer<typeof formSchema>>
            fieldLabel="Start Date"
            fieldDescription="The date of the commission"
            nameInSchema="start_date"
            wrapperClassName="flex flex-col w-full"
            calendarProps={{
              // disable dates before yesterday and weekends
              disabled: (date) =>
                date < new Date() || date.getDay() === 0 || date.getDay() === 6,
            }}
          />

          <InputWithLabel<z.infer<typeof formSchema>>
            fieldLabel="Start Time"
            fieldDescription="The time the commission starts."
            nameInSchema="start_time"
            type="time"
            wrapperClassName="w-full"
          />
        </div>

        <div className="flex items-center">
          <SelectWithLabel<z.infer<typeof formSchema>>
            fieldLabel={
              <div className="flex gap-2 items-center">
                Address
                <NewAddressDialog
                  addressFormProps={{
                    onSubmit: () => {},
                  }}
                />
              </div>
            }
            nameInSchema="address_id"
            fieldDescription="The address where the commission will take place."
            data={addresses.map((address) => ({
              value: address.id.toString(),
              label: address.name,
            }))}
            wrapperClassName="w-full"
          />
        </div>

        {selectedAddress ? (
          <AddressPreview address={selectedAddress} />
        ) : (
          <div className="bg-card flex border rounded-md items-center justify-center p-12">
            <p className="select-none opacity-70">No address selected</p>
          </div>
        )}

        <FileInputWithLabel<z.infer<typeof formSchema>>
          fieldLabel="Images"
          fieldDescription="You can attach images if needed."
          nameInSchema="images_names"
          multiple={true}
          wrapperClassName="w-full"
          accept={ACCEPTED_FILE_TYPES.join(", ")}
        />

        <FileInputImagesPreview
          images={images}
          onRemove={(index) => {
            if (!images) return;
            const newImages = Array.from(images);
            newImages.splice(index, 1);
            form.setValue("images_names", newImages);
          }}
        />

        <TextAreaWithLabel<z.infer<typeof formSchema>>
          nameInSchema="notes"
          fieldLabel="Notes"
          fieldDescription="Additional information about the commission or any special requests."
        />
        <div className="mt-4 flex items-center justify-between w-full">
          <Button
            variant={"destructive"}
            onClick={() => {
              form.reset();
            }}
            type="reset"
          >
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
