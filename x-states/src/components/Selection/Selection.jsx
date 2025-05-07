import React from "react";
import Styles from "./Selection.module.css";

const Selection = ({ data = [], name="", current="", onChange, isvisible = false }) => {
  console.log(data);
  return ( 
    <select className={Styles.select} value={current} disabled={!isvisible} onChange={onChange} >

      <option  value="" disabled> select the {name}</option>
      {data.map((item,idx)=> <option key={idx} value={item}> {item}</option> )}

    </select>
 
  );
};

export default Selection;
