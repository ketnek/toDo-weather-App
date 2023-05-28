import "./Form.css";

export default function Form({ onAddActivity }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const data = {
      name: form.elements.name.value,
      isForGoodWeather: form.elements.activity.checked,
    };
    onAddActivity(data);
    form.reset();
    form.elements.name.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <fieldset className="form__fieldset">
        <legend className="form__fieldset-legend">Add new Activity:</legend>
        <label htmlFor="name">
          Name:
          <input
            className="form__activity-input"
            type="text"
            id="name"
            name="name"
          ></input>
        </label>
        <label htmlFor="activity">
          Good-weather activity:
          <input type="checkbox" id="activity" name="activity"></input>
        </label>
      </fieldset>
      <button className="form__button" type="submit">
        Submit
      </button>
    </form>
  );
}
