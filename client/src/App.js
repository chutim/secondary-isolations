import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { cloneDeep } from "lodash";
import {
  Home,
  Kits,
  CreateOrEdit,
  Table,
  PrivateRoute,
  Login,
  Invalid,
} from "./components";
import apis from "./api";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      allKits: [],
      rowCount: 0,
      currentSpecies: "",
      currentPosKits: [],
      currentNegKits: [],
      tableData: {},
      allSpecies: [], //for listing species on Home, & creating kit datalist
      allKitIDs: {}, //for creating kit, checking if ID already exists
    };
  }

  componentDidMount = async () => {
    this.fetchLocalStorage();
    this.fetchKitsFromDatabase();
    this.getUser();
  };

  /**************
   CDM functions
  ****************/
  fetchLocalStorage = async () => {
    console.log("Fetching state from local storage...");

    const localState = JSON.parse(localStorage.getItem("appState"));
    if (localState) {
      // do not need to store/fetch allKits or allSpecies, those can change in db
      let {
        rowCount,
        currentSpecies,
        currentPosKits,
        currentNegKits,
        tableData,
      } = localState;

      rowCount = rowCount || 0;
      currentSpecies = currentSpecies || "";
      currentPosKits = currentPosKits || [];
      currentNegKits = currentNegKits || [];
      tableData = tableData || {};

      await this.setState({
        rowCount,
        currentSpecies,
        currentPosKits,
        currentNegKits,
        tableData,
      });
    }
    console.log("State loaded.");
  };

  fetchKitsFromDatabase = async () => {
    console.log("Fetching kits from database...");
    const responseData = await apis
      .getAllKits()
      .then((res) => res.data.data)
      .catch((err) => console.error(err));

    const allKits = [];
    for (let kit of responseData) {
      //only grab the fields needed, excluding timestamps and db indices
      const { id, name, species, type, constants } = kit;
      allKits.push({
        id,
        name,
        species,
        type,
        constants,
      });
    }

    const allSpeciesSet = this.extractUniqueProps(allKits, "species");
    const allSpecies = Array.from(allSpeciesSet).sort();

    const allKitIDs = this.extractUniqueProps(allKits, "id");

    await this.setState({ allKits, allSpecies, allKitIDs });
    console.log("All kits loaded.");
  };

  extractUniqueProps = (allKits, prop) => {
    const set = new Set();
    for (let kit of allKits) {
      set.add(kit[prop]);
    }
    return set;
  };

  getUser = () => {
    apis
      .checkLoginStatus()
      .then((response) => {
        if (response.data.user) {
          console.log("Existing session; logged in.");
          this.setState({
            loggedIn: true,
          });
        } else {
          console.log("No existing session.");
          this.setState({
            loggedIn: false,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  /**************
   Kits component
  ***************/
  selectSpecies = async (currentSpecies) => {
    const currentKits = this.state.allKits.filter(
      (kit) => kit.species === currentSpecies
    );
    const { currentPosKits, currentNegKits } = this.sortKits(currentKits);
    await this.setState({ currentSpecies, currentPosKits, currentNegKits });

    this.updateLocalStorage();
  };

  sortKits = (currentKits) => {
    const positiveKits = [],
      negativeKits = [];

    for (let kit of currentKits) {
      if (kit.type === "Positive") positiveKits.push(kit);
      else if (kit.type === "Negative") negativeKits.push(kit);
    }
    return { currentPosKits: positiveKits, currentNegKits: negativeKits };
  };

  /******************
   table modification
  *******************/
  updateTable = async (modification, kit) => {
    const tableData = cloneDeep(this.state.tableData);

    if (modification === "add") {
      this.addRowToTable(kit, tableData);
      await this.modifyRowCount(modification);
    } else if (modification === "subtract") {
      const noKitInTable = this.subtractRowFromTable(kit, tableData);
      if (noKitInTable) return;
      await this.modifyRowCount(modification);
    }

    await this.setState({ tableData });
    this.updateLocalStorage();
  };

  addRowToTable = (kit, tableData) => {
    //consecutively move deeper into table, assigning empty obj if needed
    tableData[kit.species] = tableData[kit.species] || {};
    const tableSpecies = tableData[kit.species];

    tableSpecies[kit.id] = tableSpecies[kit.id] || {};
    const speciesKit = tableSpecies[kit.id];

    //if the kit is not in table, add it
    if (!Object.keys(speciesKit).length) {
      Object.assign(speciesKit, kit);
      speciesKit.samples = [];
    }

    //add new sample row of empty strings
    const newSample = Array(kit.constants.length + 2).fill("");
    speciesKit.samples.push(newSample);
  };

  subtractRowFromTable = (kit, tableData) => {
    const tableSpecies = tableData[kit.species];
    //if the kit is not in the table, nothing to subtract
    if (!tableSpecies || !tableSpecies[kit.id]) {
      return true;
    }

    const kitSamples = tableSpecies[kit.id].samples;
    kitSamples.pop();

    if (!kitSamples.length) {
      this.deleteKitFromTable(tableData, kit.species, kit.id);
    }
  };

  //called after updating/deleting a kit
  updateTableData = async (updatedKit, mod) => {
    const tableData = cloneDeep(this.state.tableData);
    if (mod === "update") {
      this.updateKitInTable(updatedKit, tableData);
      await this.setState({ tableData });
    } else if (mod === "delete") {
      await this.handleTableDeleteButton(
        "kit",
        updatedKit.species,
        updatedKit.id
      );
    }
    this.updateLocalStorage();
  };

  updateKitInTable = (updatedKit, tableData) => {
    const { id, name, species, type, constants } = updatedKit;
    const kit = tableData[species][id];
    kit.name = name;
    kit.type = type;
    kit.constants = constants;

    //recalculate the sample rows
    for (let rowIdx in kit.samples) {
      let row = kit.samples[rowIdx];
      const sampleID = row[0],
        cellCount = row[1];
      row = [sampleID, cellCount, ...Array(constants.length).fill("")];
      this.calculateCells(row, constants, cellCount);
      kit.samples[rowIdx] = row;
    }
  };

  /***********
   table input
  ************/
  handleTableInput = async (inputType, kit, sampleRow, input) => {
    const tableData = cloneDeep(this.state.tableData);
    let row = tableData[kit.species][kit.id].samples[sampleRow];

    if (inputType === "sampleID") {
      row[0] = input;
    } else if (inputType === "cellCount") {
      row[1] = input;
      this.calculateCells(row, kit.constants, input);
    }

    await this.setState({ tableData });
    this.updateLocalStorage();
  };

  calculateCells = (row, constants, cellCount) => {
    for (let i = 2; i < row.length; i++) {
      const currentConstant = constants[i - 2],
        constantCellDivisor = currentConstant[3],
        kitConstant = currentConstant[2];

      //if the constant is for an incubation, a spin, or column washes, just render it
      if (constantCellDivisor === "n/a") {
        row[i] = cellCount !== "" ? kitConstant : "";
        continue;
      }

      //otherwise, a calculation is needed
      const calculatedVol = this.calculateVolume(
        constantCellDivisor,
        kitConstant,
        cellCount
      );

      //add comma separators for visibility
      row[i] = calculatedVol
        ? calculatedVol.toLocaleString("en", { useGrouping: true })
        : "";
    }
  };

  calculateVolume = (constantCellDivisor, kitConstant, cellCount) => {
    const normalizedCellCount = this.normalizeCellCount(
      constantCellDivisor,
      cellCount
    );
    let finalVol = kitConstant * normalizedCellCount;

    //cap the volume at 50 mL -> lab protocol
    if (finalVol > 50000) finalVol = 50000;

    //>200 uL micropipette increments are integers
    return finalVol < 200 ? finalVol.toFixed(1) : Math.ceil(finalVol);
  };

  normalizeCellCount = (constantCellDivisor, cellCount) => {
    //grab the exponent from the kit cell divisor and convert into powers of 10 above 10^6
    const kitCellDivisor =
      10 ** ((constantCellDivisor && constantCellDivisor.split("^")[1]) - 6);
    //6 corresponds to 10^6

    let normalizedCellCount = cellCount / kitCellDivisor;

    //if the constant is for a "up to 10^XX" kind of parameter, round up
    if (constantCellDivisor.includes("up to")) {
      normalizedCellCount = Math.ceil(normalizedCellCount);
    }

    return normalizedCellCount;
  };

  /**************
   table deleting
  ***************/
  handleTableDeleteButton = async (speciesOrKit, species, kitID) => {
    let rowCount = this.state.rowCount;
    const tableData = cloneDeep(this.state.tableData);

    if (speciesOrKit === "species") {
      rowCount = this.deleteSpeciesFromTable(tableData, species, rowCount);
    } else if (speciesOrKit === "kit") {
      rowCount = this.deleteKitFromTable(tableData, species, kitID, rowCount);
    }

    await this.setState({
      rowCount,
      tableData,
    });
    this.updateLocalStorage();
  };

  deleteSpeciesFromTable = (tableData, species, rowCount) => {
    const kits = tableData[species];
    for (let kitID in kits) {
      rowCount -= kits[kitID].samples.length;
    }

    delete tableData[species];

    return rowCount;
  };

  deleteKitFromTable = (tableData, species, kitID, rowCount) => {
    if (rowCount) {
      rowCount -= tableData[species][kitID].samples.length;
    }

    delete tableData[species][kitID];

    //if there are no more kits for a species, delete species
    if (!Object.keys(tableData[species]).length) {
      delete tableData[species];
    }

    return rowCount;
  };

  clearTable = async () => {
    await this.setState({
      rowCount: 0,
      tableData: {},
    });
    this.updateLocalStorage();
  };

  /***************
   other functions
   ***************/
  setLoggedInStatus = (bool) => {
    this.setState({ loggedIn: bool });
  };

  updateLocalStorage = () => {
    const {
      rowCount,
      currentSpecies,
      currentPosKits,
      currentNegKits,
      tableData,
    } = this.state;
    localStorage.setItem(
      "appState",
      JSON.stringify({
        rowCount,
        currentSpecies,
        currentPosKits,
        currentNegKits,
        tableData,
      })
    );
  };

  modifyRowCount = (modification) => {
    if (modification === "add")
      this.setState({ rowCount: this.state.rowCount + 1 });
    else if (modification === "subtract")
      this.setState({ rowCount: this.state.rowCount - 1 });
  };

  render() {
    return (
      <Router className="main">
        <Login
          loggedIn={this.state.loggedIn}
          setLoggedInStatus={this.setLoggedInStatus}
        />
        <Switch>
          <Route
            path="/kits"
            render={(props) => (
              <Kits
                {...props}
                loggedIn={this.state.loggedIn}
                currentSpecies={this.state.currentSpecies}
                currentPosKits={this.state.currentPosKits}
                currentNegKits={this.state.currentNegKits}
                rowCount={this.state.rowCount}
                tableData={this.state.tableData}
                updateTable={this.updateTable}
              />
            )}
          ></Route>

          <PrivateRoute
            path={["/edit/:kitID", "/create"]}
            component={CreateOrEdit}
            loggedIn={this.state.loggedIn}
            allKits={this.state.allKits}
            rowCount={this.state.rowCount}
            allKitIDs={this.state.allKitIDs}
            currentSpecies={this.state.currentSpecies}
            allSpecies={this.state.allSpecies}
            tableData={this.state.tableData}
            fetchKitsFromDatabase={this.fetchKitsFromDatabase}
            selectSpecies={this.selectSpecies}
            updateTableData={this.updateTableData}
          ></PrivateRoute>

          <Route
            path="/table"
            render={(props) => (
              <Table
                {...props}
                loggedIn={this.state.loggedIn}
                tableData={this.state.tableData}
                selectSpecies={this.selectSpecies}
                updateTable={this.updateTable}
                handleTableInput={this.handleTableInput}
                handleTableDeleteButton={this.handleTableDeleteButton}
                clearTable={this.clearTable}
              />
            )}
          ></Route>

          <Route
            path="/"
            exact={true}
            render={(props) => (
              <Home
                {...props}
                loggedIn={this.state.loggedIn}
                rowCount={this.state.rowCount}
                allSpecies={this.state.allSpecies}
                selectSpecies={this.selectSpecies}
              />
            )}
          ></Route>

          <Route
            path="/invalid"
            render={(props) => (
              <Invalid {...props} rowCount={this.state.rowCount} />
            )}
          ></Route>

          <Route
            path="/"
            render={(props) => (
              <Invalid {...props} rowCount={this.state.rowCount} />
            )}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

/*
DATA STRUCTURES EXAMPLES:

kit = {
  id: "130-096-537",
  name: "Pan Monocyte Isolation Kit",
  species: "Human",
  type: "Negative",
  constants: [
    ["Buffer", "µL", "40", "10^7"],
    ["FcR Blocking Reagent", "µL", "10", "10^7"],
    ["Biotin-Antibody Cocktail", "µL", "10", "10^7"],
    ["Incubation", "min", "5", "n/a"],
    etc...
  ],
};

tableData = {
  Human: {
    "130-096-537": {
      id: "130-096-537",
      name: "Pan Monocyte Isolation Kit",
      species: "Human",
      type: "Negative",
      constants: [
        ["Buffer", "µL", "40", "10^7"],
        ["FcR Blocking Reagent", "µL", "10", "10^7"],
        ["Biotin-Antibody Cocktail", "µL", "10", "10^7"],
        ["Incubation", "min", "5", "n/a"],
        etc...
      ],
      samples: [
        ["sample1", "25.2", "100.8", "25.2", "25.2", "5", etc...],
        ["sample2", "10", "40", "10", "10", "5", etc...],
      ],
    },
  },
};
*/
