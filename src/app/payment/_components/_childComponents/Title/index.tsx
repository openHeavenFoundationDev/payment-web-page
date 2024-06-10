import React from "react";
import { TitleProps } from "@/interfaces/TitleProps";

const Title: React.FC<TitleProps> = ({ label }) => {
  return <h1 className="text-center text-3xl font-bold">{label}</h1>;
};

export default Title;
