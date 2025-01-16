"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  addressSelectSchema,
  commissionFormSchema,
  recurrenceSchema,
  serviceSelectSchema,
} from "@/db/schema";
// import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { InputWithLabel } from "@/components/inputs/InputWithLabel/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel/SelectWithLabel";
import DatePicker from "@/components/inputs/DatePicker/DatePicker";
import {
  capitalizeFirstWord,
  makePlural,
  recurrenceToSingular,
} from "@/lib/utils";
import AddressPreview from "@/components/AddressPreview/AddressPreview";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel/TextAreaWithLabel";
import { useForm } from "react-hook-form";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileInputWithLabel } from "@/components/inputs/FileInputWithLabel/FileInputWIthLabel";
import { ACCEPTED_FILE_TYPES } from "@/lib/constants";
import FileInputImagesPreview from "@/components/FileInputImagesPreview/FileInputImagesPreview";
import FormServicePreview from "@/components/forms/CommissionForm/FormServicePreview/FormServicePreview";
import { useMemo, useState } from "react";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel/CheckboxWithLabel";
import { useToast } from "@/hooks/use-toast";
import { addAddressAction } from "@/actions";
import { Plus } from "lucide-react";
import { commissionFormSchemaType } from "@/types";
import HiddenInputUserID from "@/components/inputs/HiddenInputUserID/HiddenInputUserID";
import AddressDialog from "@/components/AddressDialog/AddressDialog";

// TODO: add check if date and time are available
export default function CommissionForm({
  defaultValues,
  services,
  addresses,
  onSubmit,
}: {
  defaultValues?: commissionFormSchemaType;
  services: z.infer<typeof serviceSelectSchema>[];
  addresses: z.infer<typeof addressSelectSchema>[];
  onSubmit: (values: commissionFormSchemaType) => void;
}) {
  // const { user } = useKindeAuth();
  const { toast } = useToast();

  const [addressDialogOpen, setAddressDialogOpen] = useState(false);

  const form = useForm<commissionFormSchemaType>({
    resolver: zodResolver(commissionFormSchema),
    defaultValues: defaultValues || {
      name: "",
      is_recurring: false,
      recurrence: null,
      start_date: new Date(),
      images_files: null,
      start_time: new Date().getHours() + ":" + new Date().getMinutes(),
      units: 0,
      unknown_units: false,
      notes: "",
    },
    mode: "onBlur",
  });

  const selectedAddressId = form.watch("address_id");
  const selectedAddress = useMemo(
    () =>
      (addresses ?? []).find(
        (address) => address.id === Number(selectedAddressId)
      ) || null,
    [addresses, selectedAddressId]
  );

  const selectedServiceId = form.watch("service_id");

  const selectedService = useMemo(
    () => services.find((service) => service.id === Number(selectedServiceId)),
    [services, selectedServiceId]
  );

  const unknownUnits = form.watch("unknown_units");
  const unitsValue = form.watch("units");

  const isRecurring = form.watch("is_recurring");
  const recurrence = form.watch("recurrence");
  const images = form.watch("images_files");

  return (
    <>
      <Form {...form}>
        <form
          id="commission-form"
          className="flex items-stretch w-full gap-8 justify-center flex-col md:max-w-[900px]  rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <HiddenInputUserID<commissionFormSchemaType> nameInSchema="user_id" />

          <InputWithLabel<commissionFormSchemaType>
            fieldLabel="Name"
            fieldDescription="Your name for this commission."
            nameInSchema="name"
            wrapperClassName="w-full"
          />
          <div className="flex items-start gap-8 w-full">
            <SelectWithLabel<commissionFormSchemaType>
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
            <div className="flex items-start gap-8 w-full">
              <InputWithLabel<commissionFormSchemaType>
                fieldLabel={`Number of ${makePlural(
                  selectedService?.price_per
                )}`}
                disabled={unknownUnits}
                fieldDescription={
                  <CheckboxWithLabel<commissionFormSchemaType>
                    fieldLabel="I don't know"
                    nameInSchema="unknown_units"
                    labelClassName="m-0"
                  />
                }
                // fieldDescription="Provide the size or number of units for the service."
                nameInSchema="units"
                type="number"
                // wrapperClassName="w-full"
              />

              <div className="flex flex-col">
                <FormLabel aria-label="Total" className={`text-base`}>
                  Total
                </FormLabel>
                <p className="whitespace-nowrap mt-2 flex gap-2 items-center ">
                  {/* Total price:{" "} */}
                  <span className="font-semibold p-1 px-2 rounded-md border border-primary">
                    {Number(selectedService.price) * (unitsValue || 0)}$
                  </span>

                  {recurrence && (
                    <span>{`every ${recurrenceToSingular({
                      recurrence: recurrence,
                    })}`}</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {selectedService?.allow_recurrence && (
            <SelectWithLabel<commissionFormSchemaType>
              fieldLabel={
                <div className="flex items-center gap-2">
                  <p>Recurring</p>
                  <CheckboxWithLabel<commissionFormSchemaType>
                    fieldLabel="Yes"
                    nameInSchema="is_recurring"
                    labelClassName="m-0 hidden"
                    aria-label="Is Recurring"
                  />
                </div>
              }
              disabled={!isRecurring}
              nameInSchema="recurrence"
              wrapperClassName="w-full"
              fieldDescription="Want to have this commission done regularly?"
              data={recurrenceSchema.options.map((option) => ({
                value: option,
                label: capitalizeFirstWord(option),
              }))}
            />
          )}

          <div className="flex items-start gap-8 ">
            <DatePicker<commissionFormSchemaType>
              fieldLabel="Start Date"
              fieldDescription="The date of the commission"
              nameInSchema="start_date"
              wrapperClassName="flex flex-col w-full"
              calendarProps={{
                // disable dates before yesterday and weekends
                disabled: (date) =>
                  date < new Date() ||
                  date.getDay() === 0 ||
                  date.getDay() === 6,
              }}
            />

            <InputWithLabel<commissionFormSchemaType>
              fieldLabel="Start Time"
              fieldDescription="The time the commission starts."
              nameInSchema="start_time"
              type="time"
              wrapperClassName="w-full"
            />
          </div>

          <div className="flex items-center gap-8 w-full">
            <div className="flex items-center w-full">
              <SelectWithLabel<commissionFormSchemaType>
                fieldLabel={
                  <div className="flex gap-2 items-center">
                    Address
                    <Button
                      onClick={() => setAddressDialogOpen(true)}
                      type="button"
                      size={"icon"}
                      variant={"default"}
                      className="h-8"
                    >
                      <Plus />
                    </Button>
                  </div>
                }
                nameInSchema="address_id"
                fieldDescription="The address where the commission will take place."
                data={
                  addresses
                    ? addresses.map((address) => ({
                        value: address.id.toString(),
                        label: address.name,
                      }))
                    : []
                }
                wrapperClassName="w-full"
              />
            </div>
            {selectedAddress ? (
              <AddressPreview address={selectedAddress} />
            ) : (
              <div className="bg-card flex border  w-full rounded-md items-center justify-center p-4">
                <p className="select-none opacity-70">No address selected</p>
              </div>
            )}
          </div>

          <FileInputWithLabel<commissionFormSchemaType>
            fieldLabel="Images"
            fieldDescription="You can attach images if needed."
            nameInSchema="images_files"
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
              form.setValue("images_files", newImages);
            }}
          />

          <TextAreaWithLabel<commissionFormSchemaType>
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
            <Button
              disabled={
                form.formState.isSubmitting ||
                form.formState.isLoading ||
                form.formState.isValidating
              }
              form="commission-form"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>

      {/* address modal */}
      <AddressDialog
        title="New Address"
        description="Add a new address to your account"
        addressFormProps={{
          onSubmit: async (values) => {
            const result = await addAddressAction({
              address: values,
              pathToRevalidate: "/schedule-commission",
            });
            if (result.isError) {
              toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
              });
            }
            toast({
              title: "Address added successfully",
            });
            setAddressDialogOpen(false);
            if (result.data) {
              form.setValue("address_id", result.data);
            }
          },
        }}
        open={addressDialogOpen}
        setOpen={setAddressDialogOpen}
      />
    </>
  );
}
