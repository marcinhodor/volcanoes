import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/marcinhodor/4ed51f0dd0fdb6b877bf793b9fe77929/raw/volcanos.csv";

const convertLatLon = ([value, direction]) =>
  ["N", "E"].includes(direction) ? +value : -value;

const splitValueDirection = (value) => {
  return value.split("°");
};

const row = (d) => {
  d.coords = [d.Longitude, d.Latitude].map((el) =>
    convertLatLon(splitValueDirection(el))
  );
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
