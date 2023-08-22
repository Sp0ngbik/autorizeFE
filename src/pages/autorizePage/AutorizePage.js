import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.scss";
export default function AutorizePage() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [userName, setUsername] = useState();
  const [passwordState, setPasswordState] = useState();
  const navigate = useNavigate();
  const setCookie = (name, value, minutes) => {
    const date = new Date();
    date.setTime(date.getTime + minutes * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };
  const sendData = async (username, password) => {
    await axios
      .get(
        `http://localhost:8080/register?userName=${username}&password=${password}`
      )
      .then((response) => {
        const userData = response.data;
        localStorage.setItem("auth_key", true);
        ///expires в куки
        setCookie("user_data", JSON.stringify(userData), 1);
        // document.cookie = `user_data=${JSON.stringify(userData)}`;
        navigate("/user_page");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  return (
    <div>
      <div className={style.registerLink}>
        <Link to="/register">Перейти на страницу регистрации</Link>
      </div>
      <form
        className={style.formAutorizeBlock}
        onSubmit={(e) => {
          e.preventDefault();
          sendData(userName, passwordState);
        }}
      >
        <h2>Авторизация</h2>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Никнейм"
          type="usernmae"
          name="username"
        />
        <input
          onChange={(e) => {
            setPasswordState(e.target.value);
          }}
          placeholder="Пароль"
          type={visiblePassword ? "text" : "password"}
          name="password"
        />
        <div>
          <input
            onClick={() => setVisiblePassword(!visiblePassword)}
            type="checkbox"
            name="visible"
          />
          Посмотреть пароль
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
