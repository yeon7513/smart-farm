import {
  IoLeaf,
  IoLeafOutline,
  IoWarning,
  IoWarningOutline,
} from "react-icons/io5";

export function dashboardAlert(option) {
  switch (option) {
    case "complete":
      return "수확이 가능합니다.";
    case "almost":
      return "예상 수확시기는 00월 00일 입니다. 예상 수확량은 00Kg입니다.";
    case "disease":
      return "해당 지역에 병해충이 유행 중입니다.!!";
    case "outline":
      return "시스템이 오작동 중입니다.";
    case "weather":
      return "해당 지역에 자연재해가 발생했습니다.!!";

    default:
      return null;
  }
}
export function dashboardAlertIcon(option) {
  switch (option) {
    case "IoLeaf":
      return <IoLeaf />;
    case "IoLeafOutline":
      return <IoLeafOutline />;
    case "IoWarning":
      return <IoWarning />;
    case "IoWarningOutline":
      return <IoWarningOutline />;
    default:
      return null;
  }
}
