import React, { useState } from "react";
import Link from "next/link";

import { header, button } from "./style/header.css";

interface headerProps {
  id: string;
  project_name: string;
}

const MainHeader: React.FC<headerProps> = ({ id, project_name }) => {
  return (
    <div className={header}>
      <div className={button}>
      <h1>Hello {id}</h1>
        <button>
          <Link href={"/user/project/info"}>project</Link>
        </button>
        <button>
          <Link href={"/user/team"}>Team</Link>
        </button>
      </div>
      <h2>Project : {project_name}</h2>
    </div>
  );
};

export default MainHeader;
