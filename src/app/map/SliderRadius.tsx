import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const SliderRadius = () => {
  const [radius, setRadius] = useState(0.5);

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
          setRadius(value[0]);
        }}
      />
    </div>
  );
};

export default SliderRadius;
