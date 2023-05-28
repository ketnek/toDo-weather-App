import "./App.css";
import Form from "./components/Form/Form";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import List from "./components/List/List";
import { useEffect, useState } from "react";

function App() {
  ////State

  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [weather, setWeather] = useState({});

  ////Variables

  const filteredActivities = activities.filter((activity) => {
    return activity.isForGoodWeather === weather.isGoodWeather;
  });
  const URL = "https://example-apis.vercel.app/api/weather/europe";

  ////Get Data

  const getWeather = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    getWeather();
    const intervalId = setInterval(getWeather, 5000);

    return () => clearInterval(intervalId);
  }, []);

  ////Handle Functions

  //used in Form
  const handleAddActivity = (newActivity) => {
    setActivities([...activities, { id: uid(), ...newActivity }]);
    console.log(newActivity);
  };

  const handleDeleteActivity = (id) => {
    setActivities(
      activities.filter((acticity) => {
        return acticity.id !== id;
      })
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="header__temp">
            <span className="header__icon">{weather.condition}</span>
            {weather.temperature} °C
          </p>
        </div>
        <p className="header__text">
          {weather.isGoodWeather
            ? "The weather is awesome! Go outside and:"
            : "Bad weather outside! Here's what you can do now:"}
        </p>
      </header>
      <List
        onDeleteActivity={handleDeleteActivity}
        activities={filteredActivities}
      />
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;
