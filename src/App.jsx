import { useState, useEffect } from "react";
import useGet from "./hooks/useGet";
import EventCard from "./components/EventCard";
import YearPicker from "./components/YearPicker";
import Spinner from "./components/Spinner";

function App() {
  const url = (month, day) =>
    `https://byabbe.se/on-this-day/${month}/${day}/events.json`;
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  const { data, status } = useGet(url(month, day));
  const [year, setYear] = useState([0, 10]);
  const [eventList, setEventList] = useState(null);

  function filterList(arr) {
    return arr.reverse().filter((event) => {
      const thisYear = new Date().getFullYear();
      const before = +event.year <= thisYear - year[0];
      const after = +event.year > thisYear - year[1];
      return after && before;
    });
  }

  useEffect(() => {
    if (!data) return;
    setEventList(filterList(data.events));
  }, [data, year]);

  return (
    <main className="max-w-screen-sm mx-auto p-4 pt-20 font-cabin text-lg text-stone-700">
      <h1 className="text-4xl font-bold mb-5">
        On This Day -{" "}
        <span className="text-blue-900">
          {status === "success" && data.date}
        </span>
      </h1>
      <h2 className="mb-2 text-sm">HOW MANY YEARS AGO?</h2>
      <YearPicker setYear={setYear} />
      <section>
        {status === "loading" && <Spinner />}
        {status === "error" && (
          <pre className="font-mono text-2xl text-center my-10 text-red-400">
            There was an error!
          </pre>
        )}
        {status === "success" && eventList
          ? eventList.map((event) => (
              <EventCard
                key={event.description}
                year={event.year}
                desc={event.description}
                terms={event.wikipedia}
              />
            ))
          : status === "success" &&
            !eventList && (
              <p className="font-bold text-2xl text-center my-10 text-slate-400">
                No results found!
              </p>
            )}
      </section>
    </main>
  );
}

export default App;
