import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SliderRadiusProps {
  handleSetRadius: (value: number) => void;
}

const SliderRadius = ({ handleSetRadius }: SliderRadiusProps) => {
  const [radius, setRadius] = useState(0.5);

  const handleChangeRadius = (value: number) => {
    setRadius(value);
    handleSetRadius(value);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-bold">Radius {radius} km</h1>
      <Slider
        defaultValue={[radius]}
        max={2}
        min={0.5}
        step={0.1}
        name="Radius"
        onValueChange={(value) => {
          handleChangeRadius(value[0]);
        }}
      />
    </div>
  );
};

export default SliderRadius;
