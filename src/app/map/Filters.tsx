import CategoryFilter from "@/components/CategoryFilter";
import SliderRadius from "../../components/SliderRadius";

interface FiltersProps {
  handleSetRadius: (value: number) => void;
  handleSetChecked: (value: string | null) => void;
}

const Filters = ({ handleSetRadius, handleSetChecked }: FiltersProps) => {
  return (
    <>
      <SliderRadius handleSetRadius={handleSetRadius} />
      <CategoryFilter handleSetChecked={handleSetChecked} />
    </>
  );
};

export default Filters;
