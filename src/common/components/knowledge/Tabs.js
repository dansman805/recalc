import propTypes from "prop-types";
import React, { useState } from "react";

export default function Tabs(props) {
  const [activeTab, setActiveTab] = useState(
    props.activeTabName || Object.keys(props.tabs)[0]
  );

  return (
    <>
      <div className={"tabs"}>
        <ul>
          {Object.keys(props.tabs).map((key) => (
            <li
              key={key}
              onClick={() => setActiveTab(key)}
              className={activeTab === key ? "is-active" : ""}
            >
              <a>{key}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>{props.tabs[activeTab]}</div>
    </>
  );
}

Tabs.propTypes = {
  tabs: propTypes.object,
  activeTabName: propTypes.string,
};
