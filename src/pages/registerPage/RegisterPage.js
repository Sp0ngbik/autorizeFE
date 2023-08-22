import axios from "axios";
import { useState } from "react";
import style from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    lastName: "",
    age: "",
    password: "",
  });
  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigate = useNavigate();
  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const sendForm = () => {
    if (
      formData.userName === "" ||
      formData.name === "" ||
      formData.lastName === "" ||
      formData.age === "" ||
      formData.password === ""
    ) {
      alert("Необходимо заполнить все поля");
    } else {
      axios
        .post("http://localhost:8080/register", formData)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <div>
      <div className={style.autorizeLink}>
        <Link to="/">Перейти на страцицу авторизации</Link>
      </div>
      <form
        className={style.formRegisterStyle}
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
      >
        <h2>Регистрация</h2>
        <input
          onChange={(e) => {
            formHandler(e);
          }}
          placeholder="Никнейм"
          type="username"
          name="userName"
        />
        <input
          onChange={(e) => {
            formHandler(e);
          }}
          placeholder="Имя"
          type="name"
          name="name"
        />
        <input
          onChange={(e) => {
            formHandler(e);
          }}
          placeholder="Фамилия"
          type="lastname"
          name="lastName"
        />
        <input
          onChange={(e) => {
            formHandler(e);
          }}
          placeholder="Возраст"
          type="age"
          name="age"
        />
        <input
          onChange={(e) => {
            formHandler(e);
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
