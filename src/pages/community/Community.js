import React from "react";
import Title from "../../components/layout/title/Title";
import { community } from "../../lib/intro";
import Notice from "./notice/Notice";
import Information from "./information/Information";
import Report from "./report/Report";

function Community() {
  return (
    <div>
      <Title {...community} />
      <Notice />
      <Information />
      <Report />
    </div>
  );
}

export default Community;
