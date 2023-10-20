//логіка створення постів

import "./index.css";
import { useState } from "react";

import FieldForm from "../../component/field-form";
import Grid from "../../component/grid";

//імпортуємо потрібні дані з компонента load
import { Alert, Loader, LOAD_STATUS } from "../../component/load";

//id - ідентифікатор поста
export default function Container({
  onCreate,
  placeholder,
  button,
  id = null,
}) {
  //хук стану завантаження
  const [status, setStatus] = useState(null);
  //хук стану повідомлення про помилку
  const [message, setMessage] = useState("");

  const handleSubmit = (value) => {
    return sendData({ value });
  };

  //функція відправки даних
  const sendData = async (dataToSend) => {
    //зміна статусу: йде завантаження запиту на сервер
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      //робимо запит на ендпринт
      const res = await fetch("http://localhost:4000/post-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: convertData(dataToSend),
      });

      const data = await res.json();

      //якщо запит успішний
      if (res.ok) {
        //переходимо до початкового значення
        setStatus(null);
        //якщо є onCreate, то оновлюємо список постів після створення нового поста
        if (onCreate) onCreate();
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      //спочатку робимо повідомлення, а потім змінюємо статус
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  //функція конвертування даних в JSON-формат
  const convertData = ({ value }) =>
    JSON.stringify({
      text: value, //значення, що ввели в полі вводу поста
      username: "user",
      postId: id,
    });
  return (
    <Grid>
      <FieldForm
        placeholder={placeholder}
        button={button}
        onSubmit={handleSubmit}
      />
      {/* якщо статус=ERROR то виводимо відповідне повідомлення */}
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {/* якщо статус=PROGRESS то виводимо відповідне повідомлення */}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
    </Grid>
  );
}
