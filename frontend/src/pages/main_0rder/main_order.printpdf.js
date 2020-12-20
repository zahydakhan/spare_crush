import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import MainOrderContainer from "./MainOrderContainer";
import Button from "@material-ui/core/Button";

const MainOrderPdf = ({ mainOrder }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(mainOrder);

  return (
    <div className="bg-gray-200 p-6">
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={handlePrint}
        style={{ marginLeft: "9em" }}
      >
        Print PDF{" "}
      </Button>{" "}
      <MainOrderContainer mainOrder={mainOrder} ref={componentRef} />{" "}
    </div>
  );
};

export default MainOrderPdf;
