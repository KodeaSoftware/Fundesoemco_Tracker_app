import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectComponent() {
  return (
    <Select>
      <SelectTrigger className="w-[280px] cursor-pointer">
        <SelectValue placeholder="Selecciona un proyecto" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Proyectos</SelectLabel>
          <SelectItem value="cvc">CVC</SelectItem>
          <SelectItem value="fundesoemco">Fundesoemco</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
