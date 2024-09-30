import cn from "classnames";
import styles from "./SearchBox.module.scss";

function SearchBox({ className, placeholder, name, value, onChange }) {
  // className: 클래스 이름
  // placeholder: 플레이스홀더 (인풋 미리보기)
  // name: 버튼 이름
  // value: 인풋에 들어갈 value (이거 없으면 onChange 못 붙여요.)
  // onChange: 검색 로직 구현 함수

  // ** 사용법
  // 1. 사용할 컴포넌트에서 인풋의 입력값을 저장할 state를 만들고 value props로 전달함.
  // 2. 검색 구현 로직이나 value props를 변경할 핸들러를 onChange로 전달해주세요.

  const handleSubmit = (e) => {
    console.log(e.target[0].value);
    e.preventDefault();
    onChange(e);
  };

  return (
    <form className={cn(styles.search, className)} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <span>{name}</span>
      </button>
    </form>
  );
}

export default SearchBox;
