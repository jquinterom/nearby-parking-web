import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CategoryFilterProps {
  handleSetChecked: (value: string | null) => void;
}

const CategoryFilter = ({ handleSetChecked }: CategoryFilterProps) => {
  const [checked, setChecked] = useState<string | null>(null);

  const handleChangeChecked = (value: string | null) => {
    console.log("handleChangeChecked", value);

    setChecked(value);
    handleSetChecked(value);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="all"
          checked={checked === null}
          onCheckedChange={() => handleChangeChecked(null)}
        />

        <label
          htmlFor="all"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          All
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="free"
          checked={checked === "free"}
          onCheckedChange={() => handleChangeChecked("free")}
        />

        <label
          htmlFor="free"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-500"
        >
          Free
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="pay"
          checked={checked === "pay"}
          onCheckedChange={() => handleChangeChecked("pay")}
        />

        <label
          htmlFor="pay"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500"
        >
          Pay
        </label>
      </div>
    </div>
  );
};

export default CategoryFilter;
