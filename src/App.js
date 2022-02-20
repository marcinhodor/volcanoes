import "./App.css";
import { useWorldAtlas } from "./hooks/useWordlAtlas";
import { useData } from "./hooks/useData";
import { BubbleMap } from "./components/BubbleMap/BubbleMap";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function App() {
  const [details, setDetails] = useState(null);
  const [cilckedItem, setClickedItem] = useState(null);
  const [showEmail, setShowEmail] = useState(false);

  const worldAtlas = useWorldAtlas();
  const data = useData();
  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  // console.log(worldAtlas);
  // console.log(data);

  const width = 960;
  const height = 500;

  const openDetails = (d, i) => {
    setDetails(d);
    setClickedItem(i);
  };

  const closeDetails = () => {
    setDetails(null);
    setClickedItem(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Volcanoes of the World</h1>
      </header>
      <svg width={width} height={height}>
        <BubbleMap
          worldAtlas={worldAtlas}
          data={data}
          openDetails={openDetails}
          details={details}
          cilckedItem={cilckedItem}
        />
      </svg>
      {details ? (
        <div className="modal">
          <div className="left">
            <p>Name:</p>
            <p>Type:</p>
            <p>Country:</p>
            <p>Region:</p>
            <p>Subregion:</p>
            <p>Epoch Period:</p>
            <p>Last Eruption:</p>
            <p>Summit and Elevatiuon:</p>
            <p>Latitude:</p>
            <p>Longitude:</p>
          </div>
          <div className="right">
            <p>{details.Volcano_Name}</p>
            <p>{details.Volcano_Type}</p>
            <p>{details.Country}</p>
            <p>{details.Region}</p>
            <p>{details.Subregion}</p>
            <p className="epoch">{details.epoch_period}</p>
            <p>{details.Last_Eruption}</p>
            <p>{details.Summit_and_Elevatiuon.replace(",", " /")}</p>
            <p>{details.Latitude}</p>
            <p>{details.Longitude}</p>
          </div>
          <div className="close" onClick={() => closeDetails()}>
            <AiOutlineClose className="icon" />
          </div>
        </div>
      ) : null}
      <footer>
        <span>
          Created by Marcin Hodor -&nbsp;
          {!showEmail ? (
            <span className="email" onClick={() => setShowEmail(!showEmail)}>
              show email
            </span>
          ) : (
            "mhodor@o2.pl"
          )}
        </span>
        <span>
          Data source: &nbsp;
          <a
            href="https://www.kaggle.com/deepcontractor/the-volcanoes-of-earth"
            target="_blank"
            rel="noreferrer"
          >
            link
          </a>
        </span>
        <span>
          GitHub repository: &nbsp;
          <a
            href="https://github.com/marcinhodor/volcanoes"
            target="_blank"
            rel="noreferrer"
          >
            link
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
