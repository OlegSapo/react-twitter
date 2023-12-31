//загальний контейнер для виводу всередині списку постів

import { useState, Fragment } from "react";
import Title from "../../component/title";
import Grid from "../../component/grid";
import Box from "../../component/box";
import PostCreate from "../post-create";
import { Alert, Skeleton, LOAD_STATUS } from "../../component/load";
import { getDate } from "../../util/getDate";
import PostItem from "../../container/post-item";

export default function Container() {
  //хуки стану
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  //хуки стану для тримання даних, що отримуємо з сервера
  const [data, setData] = useState(null);

  const getData = async () => {
    //зміна статусу: йде завантаження запиту на сервер
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      //робимо запит на ендпринт
      const res = await fetch("http://localhost:4000/post-list");

      const data = await res.json();

      //якщо запит успішний
      if (res.ok) {
        setData(convertData(data));
        setStatus(LOAD_STATUS.SUCCESS);
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      //спочатку робимо повідомлення, а потім змінюємо статус
      //якщо технічна помилка в коді
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  //функція конвертації даних отриманих з сервера з формату JSON
  //raw - "сирі" дані з сервера
  const convertData = (raw) => ({
    list: raw.list.reverse().map(({ id, username, text, date }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),
    isEmpty: raw.list.length === 0,
  });

  if (status === null) {
    getData();
  }

  return (
    <Grid>
      <Box>
        <Grid>
          <Title>Home</Title>

          <PostCreate
            onCreate={getData}
            placeholder="what is happening???"
            button="Post"
          />
        </Grid>
      </Box>

      {/* завантаження під дві потенціальні карти пості */}
      {status === LOAD_STATUS.PROGRESS && (
        <Fragment>
          <Box>
            <Skeleton />
          </Box>
          <Box>
            <Skeleton />
          </Box>
        </Fragment>
      )}

      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}

      {status === LOAD_STATUS.SUCCESS && (
        <Fragment>
          {/* якщо список постів порожній то відповідне повідомлення, інакше виводимо список постів */}
          {data.isEmpty ? (
            <Alert message="Список постів порожній" />
          ) : (
            data.list.map((item) => (
              <Fragment key={item.id}>
                <PostItem {...item} />
              </Fragment>
            ))
          )}
        </Fragment>
      )}
    </Grid>
  );
}
