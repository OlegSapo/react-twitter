import "./index.css";

//створення іменованих константи, що відповідають за статус завантаження
export const LOAD_STATUS = {
  PROGRESS: "progress",
  SUCCESS: "success",
  ERROR: "error",
};

//рядок для відображення повідомлення
export function Alert({ message, status = "default" }) {
  return <div className={`alert alert--${status}`}>{message}</div>;
}

//анімована лінія статусу завантаження
export function Loader() {
  return <div className="loader"></div>;
}

//анімовані сіри блоки карточек, що на місці яких після завантаження з'явиться відповідний контент
export function Skeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
    </div>
  );
}
