import { BRAND_HOUSES, type BrandId } from "@/lib/brands";
import { NativeSelect } from "@/components/ui/input";

export function BrandSelect({
  value,
  onChange,
  id,
}: {
  value: BrandId;
  onChange: (value: BrandId) => void;
  id?: string;
}) {
  return (
    <NativeSelect
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as BrandId)}
    >
      {BRAND_HOUSES.map((house) => (
        <optgroup key={house.id} label={house.label}>
          {house.brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.label}
            </option>
          ))}
        </optgroup>
      ))}
    </NativeSelect>
  );
}
