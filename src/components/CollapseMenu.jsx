import { motion } from "framer-motion";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function CollapseMenu({ svg, label, path, list }) {
  const location = useLocation();
  const pathname = location.pathname;
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <div
        onClick={toggleCollapse}
        className={`${
          pathname.includes(path)
            ? "bg-blue-700 hover:bg-blue-800 text-white"
            : " text-gray-900"
        } border  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-x-2 cursor-pointer
        ${isCollapsed ? "border-blue-500" : "border-transparent"}
        `}
      >
        {svg}
        {label}
      </div>
      {isCollapsed && (
        <motion.ul
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: "auto",
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className="flex flex-col items-start ml-4 gap-y-2 mt-3 overflow-hidden transition-all"
        >
          {list.map((item, index) => (
            <Link to={item.path} className="w-full" key={index}>
              <li
                className={`${
                  pathname === item.path
                    ? "border-blue-500"
                    : "border-transparent"
                } border rounded hover:border-blue-500 w-full text-left px-2 hover:cursor-pointer`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default CollapseMenu;
