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

//THINGS TO DO
//write a giant function for downloading from db, changing state, changing localstorage. use when C/U/D-ing. careful not to lose table data.
//maybe set timer with each update, to clear localStorage in 24 hours. have button to stop auto-clear in case user wants to keep the table over the weekend or something.

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
    ["Buffer", "µL", "30", "10^7"],
    ["Anti-Biotin Microbeads", "µL", "20", "10^7"],
    ["Incubation", "min", "10", "n/a"],
    ["Washes", "times x mL", "3 x 3", "n/a"]
  ]
};

tableKitData = [{ kit1 }, { kit2 }, { kit3 }];

arrayedKitData = [
  ["Human", [{ kit1 }, { kit2 }]],
  ["Mouse", [{ kit1 }]]
];

tableRowsHash = {
  Human: {
    "130-096-537 0": ["Human Sample 24", "45.3"],
    "130-096-537 1": ["Human Sample 25", "21.5"],
    "130-096-537 2": ["Human Sample 26", "39.2"],
    "142-829-339 0": ["Human Sample 3", "224.1"]
  },
  Mouse: {
    "120-332-192 0": ["Mouse Pool", "31"]
  }
};
*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      allKits: [],
      rowCount: 0,
      currentSpecies: "No Species Selected",
      currentPosKits: [],
      currentNegKits: [],
      tableData: {},
      tableKitData: [],
      arrayedKitData: [],
      tableRowsHash: {},
      allSpecies: [],
      allKitIDs: {}, //used for creating kit. checking if ID already exists
    };

    this.selectSpecies = this.selectSpecies.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.deleteSpeciesFromTable = this.deleteSpeciesFromTable.bind(this);
    this.deleteKitFromTable = this.deleteKitFromTable.bind(this);
    this.fetchKitsFromDatabase = this.fetchKitsFromDatabase.bind(this);
    this.updateTableKitData = this.updateTableKitData.bind(this);
    this.setLoggedInStatus = this.setLoggedInStatus.bind(this);
  }

  componentDidMount = async () => {
    this.fetchLocalStorage();
    this.fetchKitsFromDatabase();
    this.getUser();
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

  setLoggedInStatus = (bool) => {
    this.setState({ loggedIn: bool });
  };

  fetchLocalStorage = async () => {
    console.log("Fetching state from local storage...");

    const localState = JSON.parse(localStorage.getItem("appState"));
    if (localState) {
      // do not need to store/fetch allKits or allSpecies, as those can change in the database and we want to always grab the newest update on loading app
      const {
        rowCount,
        currentSpecies,
        currentPosKits,
        currentNegKits,
        tableData,
        tableKitData,
        arrayedKitData,
        tableRowsHash,
      } = localState;
      await this.setState({
        rowCount,
        currentSpecies,
        currentPosKits,
        currentNegKits,
        tableData,
        tableKitData,
        arrayedKitData,
        tableRowsHash,
      });
    }
    console.log("State loaded.");
  };

  //grabs all kits from db, generates array of allSpecies, generates hash of allKitIDs
  //sets allKits, allSpecies, allKitIDs on state
  fetchKitsFromDatabase = async () => {
    console.log("Fetching kits from database...");
    const responseData = await apis
      .getAllKits()
      .then((res) => res.data.data)
      .catch((err) => console.error(err));

    const allKits = [];
    for (let kit of responseData) {
      //only grab the fields needed, excluding timestamps and database indices
      const { id, name, species, type, constants } = kit;
      allKits.push({
        id,
        name,
        species,
        type,
        constants,
      });
    }

    const allSpecies = this.extractAllSpecies(allKits).sort();
    const allKitIDs = this.createKitIDHash(allKits);

    await this.setState({ allKits, allSpecies, allKitIDs });
    console.log("All kits loaded.");
  };

  createKitIDHash = (allKits) => {
    let allKitIDs = new Set();
    for (let kit of allKits) {
      allKitIDs.add(kit.id);
    }
    return allKitIDs;
  };

  extractAllSpecies = (allKits) => {
    const speciesSet = new Set();
    for (let kit of allKits) {
      speciesSet.add(kit.species);
    }
    return Array.from(speciesSet);
  };

  updateLocalStorage = () => {
    localStorage.setItem("appState", JSON.stringify(this.state));
  };

  modifyRowCount = (modification) => {
    if (modification === "add")
      this.setState({ rowCount: this.state.rowCount + 1 });
    else if (modification === "subtract")
      this.setState({ rowCount: this.state.rowCount - 1 });
  };

  //finds the current species' kits in allKits. calls this.sortKits to separate into positive and negative kit arrays
  //sets currentSpecies, currentPosKits, currentNegKits on state
  selectSpecies = async (currentSpecies) => {
    const currentKits = this.state.allKits.filter(
      (kit) => kit.species === currentSpecies
    );
    const { currentPosKits, currentNegKits } = this.sortKits(currentKits);
    await this.setState({ currentSpecies, currentPosKits, currentNegKits });

    this.updateLocalStorage();
  };

  sortKits = (currentKits) => {
    const positiveKits = [];
    const negativeKits = [];

    for (let kit of currentKits) {
      if (kit.type === "Positive") positiveKits.push(kit);
      else if (kit.type === "Negative") negativeKits.push(kit);
    }
    return { currentPosKits: positiveKits, currentNegKits: negativeKits };
  };

  updateTable = async (modification, kit) => {
    const tableData = cloneDeep(this.state.tableData);
    const tableSpecies = tableData[kit.species];
    if (modification === "add") {
      tableData[kit.species] = tableData[kit.species] || {};
      const tableSpecies = tableData[kit.species];

      tableSpecies[kit.id] = tableSpecies[kit.id] || {};
      const speciesKit = tableSpecies[kit.id];

      if (!Object.keys(speciesKit).length) {
        Object.assign(speciesKit, kit);
        speciesKit.samples = [];
      }

      let kitSamples = speciesKit.samples;
      const newSample = Array(kit.constants.length + 2).fill("");
      kitSamples.push(newSample);

      await this.modifyRowCount(modification);
    } else if (
      modification === "subtract" &&
      tableSpecies &&
      tableSpecies[kit.id]
    ) {
      let kitSamples = tableSpecies[kit.id].samples;
      kitSamples.pop();

      if (!kitSamples.length) {
        delete tableSpecies[kit.id];
      }

      if (!Object.keys(tableSpecies).length) {
        delete tableData[kit.species];
      }

      await this.modifyRowCount(modification);
    }
    await this.setState({ tableData });
    console.log(this.state.tableData);

    this.updateLocalStorage();
  };

  addKitData = async (kitID) => {
    //find the correct kit from allKits and add to the table
    for (let kit of this.state.allKits) {
      if (kit.id === kitID) {
        const tableKitData = [...this.state.tableKitData, kit];
        const arrayedKitData = this.hashifyKitData(tableKitData);
        await this.setState({
          tableKitData,
          arrayedKitData,
        });
        return;
      }
    }
    console.log("Kit not found in allKits.");
    return;
  };

  removeKitData = (kitID) => {
    const tableKitData = this.state.tableKitData;
    const filteredKitData = tableKitData.filter((kit) => kit.id !== kitID);
    const arrayedKitData = this.hashifyKitData(filteredKitData);
    this.setState({ tableKitData: filteredKitData, arrayedKitData });
  };

  updateTableKitData = async (updatedKit, mod) => {
    //find the kit in tableKitData and replace or delete it
    const tableKitData = cloneDeep(this.state.tableKitData);
    if (mod === "update") {
      for (let i = 0; i < tableKitData.length; i++) {
        if (tableKitData[i].id === updatedKit.id) {
          tableKitData[i] = updatedKit;
          break;
        }
      }
      //generate arrayedKitData for Table to use
      const arrayedKitData = this.hashifyKitData(tableKitData);
      await this.setState({ tableKitData, arrayedKitData });
    } else if (mod === "delete") {
      await this.deleteKitFromTable(updatedKit.id, updatedKit.species);
    }
    this.updateLocalStorage();
  };

  hashifyKitData = (tableKitData) => {
    const kitDataHash = {};
    for (let kit of tableKitData) {
      kitDataHash[kit.species] = (kitDataHash[kit.species] || []).concat(kit);
    }
    return this.arrayifyKitData(kitDataHash);
  };

  arrayifyKitData = (kitDataHash) => {
    let arrayedKitData = [];
    for (let groupSpecies in kitDataHash) {
      const groupArray = [groupSpecies, kitDataHash[groupSpecies]];
      arrayedKitData.push(groupArray);
    }
    return arrayedKitData;
  };

  modifyTableRowsHash = async (modification, species, rowKey) => {
    const tableRowsHash = cloneDeep(this.state.tableRowsHash);
    if (modification === "add") {
      if (!tableRowsHash[species]) tableRowsHash[species] = {};
      tableRowsHash[species][rowKey] = [undefined, undefined];
    } else if (modification === "subtract") {
      delete tableRowsHash[species][rowKey];
    }

    await this.setState({ tableRowsHash });
    this.updateLocalStorage();
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

  calculateVolume = (constantCellDivisor, kitConstant, cellCount) => {
    const normalizedCellCount = this.normalizeCellCount(
      constantCellDivisor,
      cellCount
    );
    let finalVol = kitConstant * normalizedCellCount;

    //cap the volume at 50 mL -> lab protocol
    if (finalVol > 50000) finalVol = 50000;

    return finalVol;
  };

  calculateCells = (row, constants, cellCount) => {
    for (let i = 2; i < row.length; i++) {
      const currentConstant = constants[i - 2];
      const constantCellDivisor = currentConstant[3];
      const kitConstant = currentConstant[2];

      //if the constant is for an incubation, a spin, or column washes, just render it
      if (constantCellDivisor === "n/a") {
        row[i] = kitConstant;
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

    return row;
  };

  handleTableInput = async (inputType, kit, sampleRow, input) => {
    const tableData = cloneDeep(this.state.tableData);
    let row = tableData[kit.species][kit.id].samples[sampleRow];

    if (inputType === "sampleID") {
      row[0] = input;
    } else if (inputType === "cellCount") {
      row[1] = input;
      row = this.calculateCells(row, kit.constants, input);
    }

    await this.setState({ tableData });
    this.updateLocalStorage();
  };

  deleteSpeciesFromTable = (rowCount, tableData, species) => {
    //deduct the numbers of samples per kit
    const kits = tableData[species];
    for (let kitID in kits) {
      rowCount -= kits[kitID].samples.length;
    }

    delete tableData[species];

    return rowCount;
  };

  deleteKitFromTable = (rowCount, tableData, species, kitID) => {
    rowCount -= tableData[species][kitID].samples.length;

    delete tableData[species][kitID];

    //if there are no more kits for a species, delete species
    if (!Object.keys(tableData[species]).length) {
      delete tableData[species];
    }

    return rowCount;
  };

  handleTableDeleteButton = async (speciesOrKit, species, kitID) => {
    let rowCount = this.state.rowCount;
    let tableData = cloneDeep(this.state.tableData);

    if (speciesOrKit === "kit") {
      rowCount = this.deleteKitFromTable(rowCount, tableData, species, kitID);
    } else if (speciesOrKit === "species") {
      rowCount = this.deleteSpeciesFromTable(rowCount, tableData, species);
    }

    await this.setState({
      rowCount,
      tableData,
    });
    this.updateLocalStorage();
  };

  clearTable = async () => {
    await this.setState({
      rowCount: 0,
      tableData: {},
    });
    this.updateLocalStorage();
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
            path="/edit/:kitID"
            component={CreateOrEdit}
            loggedIn={this.state.loggedIn}
            allKits={this.state.allKits}
            rowCount={this.state.rowCount}
            allKitIDs={this.state.allKitIDs}
            currentSpecies={this.state.currentSpecies}
            allSpecies={this.state.allSpecies}
            fetchKitsFromDatabase={this.fetchKitsFromDatabase}
            selectSpecies={this.selectSpecies}
            updateTableKitData={this.updateTableKitData}
          ></PrivateRoute>

          <PrivateRoute
            path="/create"
            component={CreateOrEdit}
            loggedIn={this.state.loggedIn}
            allKits={this.state.allKits}
            rowCount={this.state.rowCount}
            allKitIDs={this.state.allKitIDs}
            currentSpecies={this.state.currentSpecies}
            allSpecies={this.state.allSpecies}
            fetchKitsFromDatabase={this.fetchKitsFromDatabase}
            selectSpecies={this.selectSpecies}
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
