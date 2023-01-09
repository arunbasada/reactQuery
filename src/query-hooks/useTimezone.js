import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../helpers/QueryKeys";
import { timezoneService } from "../API/timezone/TimezoneService";

export function useTimezone() {
  return useQuery({
    queryKey: [QueryKeys.TimezoneGet],
    queryFn: () => timezoneService.getTimezone().then((res) => res.data[0]),
  });
}
