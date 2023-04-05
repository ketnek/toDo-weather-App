import "./List.css";

export default function List({ activities, onDeleteActivity }) {
  const activityListItem = activities.map((activity) => {
    return (
      <li className="list__item" key={activity.id}>
        {activity.name}
        <span
          className="item__delete-button"
          onClick={() => onDeleteActivity(activity.id)}
        >
          ⓧ
        </span>
      </li>
    );
  });
  return <ul className="list">{activityListItem}</ul>;
}
