import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    text: "Profiles",
    to: "/profiles",
  },
  {
    text: "Timezone",
    to: "/timezone",
  },
];

export default function HeadPage() {
  return (
    <div className="flex flex-col justify-center h-full">
      <header className="flex flex-col items-center h-16 text-center bg-sky-600">
        <p className="pt-3 text-2xl font-bold text-white">Latest React Query</p>
      </header>
      <div className="flex grow">
        <div className="flex flex-col gap-4 p-6 bg-sky-100">
          {links.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
                    ? "font-bold bg-sky-300"
                    : "font-normal hover:bg-sky-400 hover:text-black"
                }`
              }
            >
              {item.text}
            </NavLink>
          ))}
        </div>
        <div className="p-4 overflow-scroll grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
