import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { timezoneService } from "../API/timezone/TimezoneService";
import { useTimezone } from "../query-hooks/useTimezone";
import { QueryKeys } from "../helpers/QueryKeys";

export default function Timezone() {
  const queryClient = useQueryClient();
  const { isLoading, data, isError } = useTimezone();
  const mutation = useMutation({
    mutationFn: (timezone) => timezoneService.updateTimezone({ timezone }),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TimezoneGet] });
    },
    onError: (err) => {
      console.log("unable to update the timezone" + err);
    },
  });

  const handleSubmit = (values) => {
    mutation.mutate(values.timezone);
  };

  const update = () => {
    alert('Sucessfully Updated time zone')
  }

  const formik = useFormik({
    initialValues: {
      timezone: data?.timezone ?? "",
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong..!</div>;
  }

  return (
    <div>
      <div className="mb-3 font-bold">Current timezone :</div>
      <select
        name="timezone"
        value={formik.values.timezone}
        onChange={formik.handleChange("timezone")}
        className={`w-[100px]`}
      >
         <option value={"HST"}>HST</option>
        <option value={"CST"}>MST</option>
        <option value={"AST"}>AST</option>
        <option value={"EST"}>EST</option>
      </select>
      <div>
        <button type="button" onClick={formik.handleSubmit}>
          <p onClick={update()}></p>
        </button>
      </div>
    </div>
  );
}
