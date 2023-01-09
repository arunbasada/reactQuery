import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { profileService } from "../API/profile/ProfileService";
import { QueryKeys } from "../helpers/QueryKeys";
import { useTimezone } from "../query-hooks/useTimezone";

export default function Profile() {


  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const { data: timezoneData } = useTimezone();
  const {
    isLoading,
    data: profilesList,
    isError
  } = useQuery({
    queryKey: [QueryKeys.ProfilesGet, pagination ],
    queryFn: () =>
      profileService
        .getProfiles(pagination.page, pagination.limit)
        .then((res) => res.data),
    keepPreviousData: true,
  });
 


  if (isError) {
    return <div>Oops something went wrong!</div>;
  }

  if (isLoading) {
    return <div>Loading...!</div>;
  }

  return (
    <div>
         <p className="mb-3">present timezone is {timezoneData?.timezone}</p>
      <table className="border-2 border-collapse border-blue-500">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gmail</th>
            <th>Sex</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody >
          {profilesList.map((item, i) => (
            <tr key={i}>
              <td className="px-4">{item.firstName} {item.lastName}</td>
              <td className="px-4">{item.email}</td>
              <td className="px-4">{item.gender}</td>
              <td className="px-4">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 space-x-4">
        <span>Entries Per Page</span>
        <select
          onChange={(e) =>
            setPagination((old) => ({ ...old, limit: e.target.value }))
          }
          value={pagination.limit}
        >
          <option value={3}>3</option>
          <option value={8}>8</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <button
        type="button"
          onClick={() =>
            setPagination((old) => ({
              ...old,
              page: Math.max(old.page - 1, 1),
            }))
          }
        >
          previous
        </button>
        <button
        type="button"
          onClick={() =>
            setPagination((old) => ({ ...old, page: old.page + 1 }))
          }
        >
          next
        </button>
      </div>
    </div>
  );
}
