import { toolTipForIds } from "common/components/tooltips";
import propTypes from "prop-types";
import React from "react";

export function UnlabeledNumberOutput(props) {
  const value = props.precision
    ? props.stateHook[0].toFixed(props.precision)
    : props.stateHook[0];

  return (
    <div className="field has-addons">
      <p className="control is-expanded">
        <input
          type="number"
          disabled
          className="input input-right"
          value={value}
          id={props.inputId}
        />
      </p>
    </div>
  );
}

UnlabeledNumberOutput.propTypes = {
  stateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  inputId: propTypes.string,
  precision: propTypes.number,
};

export function LabeledNumberOutput(props) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">
          <span
            className="has-tooltip-right"
            data-tooltip={toolTipForIds(props.inputId, props.label)}
          >
            {props.label}
          </span>
        </label>
      </div>
      <div className="field-body">
        <UnlabeledNumberOutput {...props} />
      </div>
    </div>
  );
}

LabeledNumberOutput.propTypes = {
  stateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  label: propTypes.string,
  inputId: propTypes.string,
  precision: propTypes.number,
};
