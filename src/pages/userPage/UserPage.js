import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
export default function UserPage() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("auth_key");
  useEffect(() => {
    isAuth ? navigate("/user_page") : navigate("/");
  }, [isAuth, navigate]);
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_data="))
    .split("=")[1];
  const cookieObjectData = JSON.parse(cookieValue);
  return (
    <div className={style.userPageBlock}>
      <div>
        <ul>Имя : {cookieObjectData.name}</ul>
        <ul>Фамилия : {cookieObjectData.lastName}</ul>
        <ul>Возраст : {cookieObjectData.age}</ul>
        <ul>Никнейм : {cookieObjectData.userName}</ul>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("auth_key", false);
          navigate("/");
        }}
      >
        Выход
      </button>
    </div>
  );
}
