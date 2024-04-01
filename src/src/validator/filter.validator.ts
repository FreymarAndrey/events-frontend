import * as Yup from "yup";

interface InitialStateFilter {
  start_date: string;
  end_date: string;
}

export class FilterValidatorForm {
  static initialState: InitialStateFilter = {
    start_date: "",
    end_date: "",
  };

  static validatorSchemaFilter = Yup.object({
    start_date: Yup.date().required("La fecha de inicio es requerida"),
    end_date: Yup.date().required("La fecha final es requerida"),
  });
}
