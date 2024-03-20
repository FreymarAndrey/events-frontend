interface InitialStateFilter {
  start_date: string;
  end_date: string;
}

export class FilterValidatorForm {
  static initialState: InitialStateFilter = {
    start_date: "",
    end_date: "",
  };
}
