import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name is too short",
    })
    .max(200),
  isFree: z.boolean(),
  price: z
    .number()
    .min(0, { message: "Price must be greater than 0" })
    .optional(),
});

interface NewPointFormProps {
  location?: LocationType;
  onSubmit: (point: LocationType) => void;
  onCancel: () => void;
}

const NewPointForm = ({
  location,
  onSubmit: handleSubmit,
  onCancel,
}: NewPointFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: location?.title,
      isFree: true,
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!location) {
      return;
    }

    const newPoint = { ...location };
    newPoint.title = values.name;
    newPoint.isFree = values.isFree;
    newPoint.price = values.price;

    handleSubmit(newPoint);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        New Point:
        <Label className="text-sm text-blue-500">
          {location?.lat}, {location?.lng}
        </Label>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Point Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="point name"
                    {...field}
                    onChange={(element) => {
                      field.onChange(element.target.value);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="isFree"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked === true);
                      }}
                      ref={field.ref}
                    />
                    <Label className="text-sm text-gray-500" htmlFor="isFree">
                      Is it free?
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!form.watch("isFree") && (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <div className="transform animate-fade-in-3">
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$1"
                        {...field}
                        type="number"
                        onChange={(element) => {
                          field.onChange(Number(element.target.value));
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          )}
          <div className="flex gap-2">
            <Button type="submit">Submit</Button>
            <Button type="button" variant={"destructive"} onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default NewPointForm;
