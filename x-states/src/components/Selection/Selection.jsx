import React from "react";
import Styles from "./Selection.module.css";

const Selection = ({ data = [], name="", onChange, isvisible = false }) => {
  console.log(data);
  return ( 
    <select className={Styles.select} name={name} disabled={!isvisible} onChange={onChange} >

      <option  value="" selected> select the {name}</option>
      {data.map((item,idx)=> <option key={idx} value={item}> {item}</option> )}

    </select>
 
  );
};

export default Selection;
