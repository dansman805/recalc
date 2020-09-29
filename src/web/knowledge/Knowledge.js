import Panel, { PanelItem } from "common/components/knowledge/Panel";
import Tabs from "common/components/knowledge/Tabs";
import React from "react";

export default function Knowledge() {
  const a = <PanelItem to={"google.com"} title={"Google"} />;
  const b = <PanelItem to={"github.com"} title={"Github"} />;
  const c = <PanelItem to={"microsoft.com"} title={"Microsoft"} />;

  return (
    <Tabs
      tabs={{
        Programming: (
          <Panel
            key={Math.random()}
            title={"Big Companies"}
            tabs={{
              All: [a, b, c],
              G: [a, b],
              M: [c],
            }}
          />
        ),
        CAD: (
          <>
            <Panel
              key={Math.random()}
              title={"Sketching"}
              tabs={{
                Beginner: [
                  <PanelItem to={""} title={"Link 1"} />,
                  <PanelItem to={""} title={"Link 2"} />,
                ],
                Intermediate: [a, b, c],
              }}
            />
            <Panel
              key={Math.random()}
              title={"3D Modeling"}
              tabs={{
                Beginner: [
                  <PanelItem to={""} title={"Link 1"} />,
                  <PanelItem to={""} title={"Link 2"} />,
                ],
                Intermediate: [a, b, c],
              }}
            />
            <Panel
              key={Math.random()}
              title={"Rendering"}
              tabs={{
                Beginner: [
                  <PanelItem to={""} title={"Link 1"} />,
                  <PanelItem to={""} title={"Link 2"} />,
                ],
                Intermediate: [a, b, c],
              }}
            />
            <Panel
              key={Math.random()}
              title={"Library / Parts Management"}
              tabs={{
                Beginner: [
                  <PanelItem to={""} title={"Link 1"} />,
                  <PanelItem to={""} title={"Link 2"} />,
                ],
                Intermediate: [a, b, c],
              }}
            />
          </>
        ),
      }}
    />
  );
}
