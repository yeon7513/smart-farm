import React, { useEffect } from "react";
import { TbMessageSearch } from "react-icons/tb";
import SearchBox from "../../../components/search_box/SearchBox";
import styles from "./ChatRoomCare.module.scss";
import { getOrder } from "../../../api/firebase";

function ChatRoomCare() {
  return (
    <div className={styles.chatRoom}>
      <SearchBox name={<TbMessageSearch />} placeholder={"채팅방 검색"} />
    </div>
  );
}

export default ChatRoomCare;
