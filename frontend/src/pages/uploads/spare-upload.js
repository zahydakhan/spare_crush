import React, { useState } from "react";
import * as XLSX from "xlsx";
import axiosInstance from "../../utils/axios";
import Button from "@material-ui/core/Button";

class SparePartsUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: "",
      audToUsd: 0.0,
      jsonData: "",
      finalData: "",
    };
  }

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=USD`)
      .then((res) => res.json())
      .then((rec) => this.setState({ audToUsd: rec["rates"]["AUD"] }));
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });

    console.log(this.state.file);
  }

  readFile() {
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>" + data); // shows that excel data is read
      console.log(this.convertToJson(data)); // shows data in json format
      this.setState({ jsonData: JSON.parse(this.convertToJson(data)) });

      console.log(this.state.jsonData);
      const jsDa = this.state.jsonData;

      this.state.jsonData.map((fr) => {
        {
          fr.aud
            ? (fr.price = fr.aud)
            : (fr.price = parseFloat(fr.usd) * parseFloat(this.state.audToUsd));
        }
        {
          fr.aud ? (fr.aud = fr.aud) : (fr.aud = null);
          fr.usd ? (fr.usd = fr.usd) : (fr.usd = null);
        }
        axiosInstance
          .post(`/sp/spareparts/`, {
            part_number: fr.part_number,
            description: fr.description,
            vendor_name: fr.vendor_name,
            vendor_status: fr.vendor_status,
            weight_kg: fr.weight_kg,
            machine: fr.machine,
            model_number: fr.model_number,
            aud: parseFloat(fr.aud),
            usd: parseFloat(fr.usd),
            price: parseFloat(fr.price).toFixed(2),
          })
          .then((res) => {
            //history.push("/admin/");
          });
        return fr;
      });
    };
    reader.readAsBinaryString(f);
  }

  convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length - 1; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  render() {
    const classes = this.props;
    return (
      <React.Fragment>
        <input
          type="file"
          id="file"
          ref="fileUploader"
          onChange={this.filePathset.bind(this)}
        />
        <br />
        <Button
          style={{ marginTop: "1.5em", backgroundColor: "#ffde00" }}
          variant="contained"
          onClick={() => {
            this.readFile();
          }}
        >
          Upload Spare Parts
        </Button>
      </React.Fragment>
    );
  }
}

export default SparePartsUpload;
