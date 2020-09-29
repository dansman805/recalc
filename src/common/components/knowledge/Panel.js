import propTypes from "prop-types";
import React, { useState } from "react";

export default function Panel(props) {
  const [activeTab, setActiveTab] = useState(
    props.activeTabName || Object.keys(props.tabs)[0]
  );

  return (
    <>
      <nav className={"panel"}>
        <p className={"panel-heading"}>{props.title}</p>
        <p className={"panel-tabs"}>
          {Object.keys(props.tabs).map((k) => (
            <a
              key={k}
              className={activeTab === k ? "is-active" : ""}
              onClick={() => setActiveTab(k)}
            >
              {k}
            </a>
          ))}
        </p>
        {props.tabs[activeTab].map((k) => k)}
      </nav>
    </>
  );
}

Panel.propTypes = {
  title: propTypes.string,
  tabs: propTypes.object,
  activeTabName: propTypes.string,
};

export function PanelItem(props) {
  return (
    <a className={"panel-block"} href={props.to}>
      {props.title}
    </a>
  );
}

PanelItem.propTypes = {
  to: propTypes.string,
  title: propTypes.string,
};
