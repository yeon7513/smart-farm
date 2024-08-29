import React from "react";
import { useComponentContext } from "../../context/ComponentContext";
import { communityTitle } from "../../lib/intro";
import Title from "../../components/layout/title/Title";
import { Outlet } from "react-router-dom";

function Community() {
  const { currComp, setCurrComp } = useComponentContext();

  const titleProps = communityTitle[currComp] || communityTitle.Notice;

  const handleChangeTitles = (compName) => {
    setCurrComp(compName);
  };

  return (
    <>
      <Title {...titleProps} />
      <div>
        <ul>
          <li>
            <button onClick={() => handleChangeTitles("Notice")}>
              공지사항
            </button>
          </li>
          <li>
            <button onClick={() => handleChangeTitles("Faq")}>FAQ</button>
          </li>
          <li>
            <button onClick={() => handleChangeTitles("SharingInformation")}>
              정보 공유
            </button>
          </li>
          <li>
            <button onClick={() => handleChangeTitles("AfterService")}>
              A/S 문의
            </button>
          </li>
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Community;
