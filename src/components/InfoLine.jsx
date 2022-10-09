import React from "react";

const InfoLine = ({ options }) => {
  return (
    <div className="group flex w-full items-center pb-1 cursor-default hover:bg-[#292929]">
      <div className="flex items-center gap-2 w-[85%] xs:w-[90%] ss:w-[60%] lg:w-[40%]">
        <p className="hidden sm:block text-lg font-semibold w-8">#</p>
        <p className="w-[75%] text-lg font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden">
          name
        </p>
      </div>
      <div className="hidden text-lg font-semibold lg:block lg:w-[35%] text-ellipsis whitespace-nowrap overflow-hidden">
        album
      </div>
      <div className="hidden text-lg font-semibold ss:block w-[30%] lg:w-[15%]">
        {options ? "release" : "added at"}
      </div>
      <div className="text-lg font-semibold w-[10%] lg:w-[10%] text-right">time</div>
    </div>
  );
};

export default InfoLine;
