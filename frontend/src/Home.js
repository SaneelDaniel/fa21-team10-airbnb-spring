import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import Banner from './Banner';
import Card from './Card';
import axios from 'axios';
import AppState from './State/AppContext';
import api from "./State/Api";

// ES7 snippets to do 'rfce'

function Home() {
  const context = useContext(AppState);
  const propertyData = useContext(AppState);

  const [data, setData] = useState([]);

  useEffect(() => {
    // getPropertyData();
    api.fetchProperties()
    .then(setData)
    .catch(e => console.log(e));

  }, []);

  return (
    <div className="home">
      <Banner />

      {/* <div className="home__section">
        <Card
          src="https://a0.muscache.com/im/pictures/eb9c7c6a-ee33-414a-b1ba-14e8860d59b3.jpg?im_w=720"
          title="Online Experiences"
          description="Unique activities we can do together, led by a world of hosts."
        />
        <Card
          src="https://a0.muscache.com/im/pictures/15159c9c-9cf1-400e-b809-4e13f286fa38.jpg?im_w=720"
          title="Unique stays"
          description="Spaces that are more than just a place to sleep."
        />
        <Card
          src="https://a0.muscache.com/im/pictures/fdb46962-10c1-45fc-a228-d0b055411448.jpg?im_w=720"
          title="Entire homes"
          description="Comfortable private places, with room for friends or family."
        />
      </div> */}
      <div className="home__section">
        {
          data.map((item, idx) => {
            return (
              <Card
                key={idx}
                src={item.image}
                title={item.name}
                price={`$${item.price}`}
                description={item.description}
                onClick={() => console.log("HEY")}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Home;
