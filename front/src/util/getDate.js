//функція для конвертації мілісекунд дати в звичний формат дати
export const getDate = (time) => {
  //створення об'єкта Date на основі Unix-часу
  const date = new Date(time);

  //отримання дати та часу в потрібному форматі
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  //форматування результату в формат "dd.mm hh:mm" ы виведення
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedDate;
};
