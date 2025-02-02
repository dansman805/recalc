import Heading2 from "common/components/calc-heading/Heading2";
import Table from "common/components/Table";
import Compressor from "common/models/Compressor";
import Measurement from "common/models/Measurement";
import { setTitle } from "common/tooling/routing";
import React from "react";

import compressorConfig from "./index";

export default function Compressors() {
  setTitle(compressorConfig.title);

  const data = React.useMemo(
    () =>
      Compressor.getAllCompressors().map((c) => ({
        link: <a href={c.url}>{c.name}</a>,
        weight: c.weight.to("lb").scalar.toFixed(2),
        cfmZero: c
          .cfmFn(new Measurement(0, "psi"))
          .to("ft3/min")
          .scalar.toFixed(2),
        cfmFourty: c
          .cfmFn(new Measurement(40, "psi"))
          .to("ft3/min")
          .scalar.toFixed(2),
        cfmEighty: c
          .cfmFn(new Measurement(80, "psi"))
          .to("ft3/min")
          .scalar.toFixed(2),
        cfmOneTen: c
          .cfmFn(new Measurement(110, "psi"))
          .to("ft3/min")
          .scalar.toFixed(2),
        cfmPerLb: c
          .cfmFn(new Measurement(110, "psi"))
          .div(c.weight)
          .to("ft3/min*lb")
          .scalar.toFixed(3),
        timeToFill: c
          .timeToFillmLToPSI(
            new Measurement(2000, "mL"),
            new Measurement(110, "psi")
          )
          .scalar.toFixed(0),
      })),
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "link",
      },
      {
        Header: "Weight (lb)",
        accessor: "weight",
      },
      {
        Header: "CFM at 0psi (ft³/min)",
        accessor: "cfmZero",
      },
      {
        Header: "CFM at 40psi (ft³/min)",
        accessor: "cfmFourty",
      },
      {
        Header: "CFM at 80psi (ft³/min)",
        accessor: "cfmEighty",
      },
      {
        Header: "CFM at 110psi (ft³/min)",
        accessor: "cfmOneTen",
      },
      {
        Header: "CFM/lb (110 psi)",
        accessor: "cfmPerLb",
      },
      {
        Header: "Time to fill 2000mL to 110psi (s)",
        accessor: "timeToFill",
      },
    ],
    []
  );

  return (
    <>
      <Heading2 image={compressorConfig.image} title={compressorConfig.title} />
      <Table columns={columns} data={data} />
    </>
  );
}
