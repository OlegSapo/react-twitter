//форма для постів

import "./index.css";

//підключаємо хуки стану
import { useState } from "react";

export default function Component({ placeholder, button, onSubmit }) {
  //хук стану елемента поя вводу
  const [value, setValue] = useState("");

  //обробник подій встановлення значення під час внесення даних в поле вводу
  const handleChange = (event) => setValue(event.target.value);

  //обробник подій вразы натискання кнопки Post
  const handleSubmit = () => {
    if (value.length === 0) return null;
    if (onSubmit) {
      onSubmit(value); //відправка даних з поля вводу
    } else {
      throw new Error("onSubmiit props is undefined");
    }

    setValue("");
  };

  //задаэ активнысть кнопки Post та має значеня true якщо поле вводу порожнє
  const isDisabled = value.length === 0;

  return (
    <div className="field-form">
      <textarea
        onChange={handleChange}
        value={value}
        rows={2} //textarea має висоту в 2 рядка
        placeholder={placeholder}
        className="field-form__field"
      ></textarea>

      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className="field-form__button"
      >
        {button}
      </button>
    </div>
  );
}
