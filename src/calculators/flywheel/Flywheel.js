import {
  calculateWindupTime,
  generateChartData,
} from "calculators/flywheel/math";
import Heading from "common/components/calc-heading/Heading";
import { LabeledMotorInput } from "common/components/io/inputs/MotorInput";
import { LabeledNumberInput } from "common/components/io/inputs/NumberInput";
import { LabeledQtyInput } from "common/components/io/inputs/QtyInput";
import { LabeledQtyOutput } from "common/components/io/outputs/QtyOutput";
import { makeDataObj, makeLineOptions } from "common/tooling/charts";
import { motorMap } from "common/tooling/motors";
import {
  MotorParam,
  NumberParam,
  QtyParam,
  QueryableParamHolder,
  stateToQueryString,
  queryStringToDefaults,
} from "common/tooling/query-strings";
import Qty from "js-quantities";
import { Line } from "lib/react-chart-js";
import React, { useEffect, useState } from "react";

export default function Flywheel() {
  // Parse URL params
  const {
    motor: motor_,
    ratio: ratio_,
    radius: radius_,
    targetSpeed: targetSpeed_,
    weight: weight_,
  } = queryStringToDefaults(
    window.location.search,
    {
      motor: MotorParam,
      ratio: NumberParam,
      radius: QtyParam,
      targetSpeed: QtyParam,
      weight: QtyParam,
    },
    {
      motor: {
        quantity: 1,
        data: motorMap["Falcon 500"],
      },
      ratio: 1,
      radius: Qty(2, "in"),
      targetSpeed: Qty(2000, "rpm"),
      weight: Qty(5, "lb"),
    }
  );

  // Inputs
  const [motor, setMotor] = useState(motor_);
  const [ratio, setRatio] = useState(ratio_);
  const [radius, setRadius] = useState(radius_);
  const [targetSpeed, setTargetSpeed] = useState(targetSpeed_);
  const [weight, setWeight] = useState(weight_);

  // Outputs
  const [windupTime, setWindupTime] = useState(Qty(0, "s"));
  const [chartData, setChartData] = useState(makeDataObj([]));

  useEffect(() => {
    setWindupTime(
      calculateWindupTime(
        weight,
        radius,
        motor.data.freeSpeed,
        motor.data.stallTorque,
        motor.data.stallCurrent,
        motor.data.resistance,
        motor.quantity,
        ratio,
        targetSpeed
      )
    );

    setChartData(
      makeDataObj([
        generateChartData(
          weight,
          radius,
          motor.data.freeSpeed,
          motor.data.stallTorque,
          motor.data.stallCurrent,
          motor.data.resistance,
          motor.quantity,
          ratio,
          targetSpeed
        ),
      ])
    );
  }, [motor, ratio, radius, targetSpeed, weight]);

  return (
    <>
      <Heading
        title="Flywheel calculator"
        getQuery={() => {
          return stateToQueryString([
            new QueryableParamHolder({ motor }, MotorParam),
            new QueryableParamHolder({ ratio }, NumberParam),
            new QueryableParamHolder({ radius }, QtyParam),
            new QueryableParamHolder({ targetSpeed }, QtyParam),
            new QueryableParamHolder({ weight }, QtyParam),
          ]);
        }}
      />
      <div className="columns">
        <div className="column">
          <LabeledMotorInput
            label={"Motors"}
            stateHook={[motor, setMotor]}
            choices={Object.keys(motorMap)}
          />
          <LabeledNumberInput stateHook={[ratio, setRatio]} label="Ratio" />
          <LabeledQtyInput
            stateHook={[targetSpeed, setTargetSpeed]}
            choices={["rpm"]}
            label={"Target Speed"}
          />
          <LabeledQtyInput
            stateHook={[radius, setRadius]}
            choices={["in", "cm"]}
            label={"Radius"}
          />
          <LabeledQtyInput
            stateHook={[weight, setWeight]}
            choices={["lb", "kg", "g"]}
            label={"Weight"}
          />
          <LabeledQtyOutput
            stateHook={[windupTime, setWindupTime]}
            choices={["s"]}
            label={"Windup Time"}
            precision={3}
          />
        </div>
        <div className="column">
          <Line
            data={chartData}
            options={makeLineOptions(
              "Ratio vs Windup Time",
              "Ratio",
              "Time (s)"
            )}
          />
        </div>
      </div>
    </>
  );
}
