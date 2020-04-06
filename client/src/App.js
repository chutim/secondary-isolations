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
  Error
} from "./components";
import apis from "./api";
import "./App.css";
import axios from "axios";

//THINGS TO DO
//write a giant function for downloading from db, changing state, changing localstorage. use when C/U/D-ing. careful not to lose table data.
//maybe set timer with each update, to clear localStorage in 24 hours. have button to stop auto-clear in case user wants to keep the table over the weekend or something.

// DATA STRUCTURES EXAMPLES:
// kit = {
//   id: "130-096-537",
//   name: "Pan Monocyte Isolation Kit",
//   species: "Human",
//   type: "Negative",
//   constants: [
//     ["Buffer (µL)", "40"],
//     ["FcR Blocking Reagent (µL)", "10"],
//     ["Biotin-Antibody Cocktail (µL)", "10"],
//     ["Incubation (min)", "5"],
//     ["Buffer (µL)", "30"],
//     ["Anti-Biotin Microbeads (µL)", "20"],
//     ["Incubation (min)", "10"],
//     ["Washes (times x mL)", "3 x 3"]
//   ]
// };
// tableKitIDs = { "192-050-201": 2, "190-229-501": 1, "130-096-537": 8 };
// tableKitData = [{ kit1 }, { kit2 }, { kit3 }];
// arrayedKitData = [
//   ["Human", [{ kit1 }, { kit2 }]],
//   ["Mouse", [{ kit1 }]]
// ];
// tableRowsHash = {
//   Human: {
//     "130-096-537 0": ["Human 24", "45.3"],
//     "130-096-537 1": ["Human 25", "21.5"],
//     "130-096-537 2": ["Human 26", "39.2"],
//     "142-829-339 0": ["Human 3", "224.1"]
//   },
//   Mouse: {
//     "120-332-192 0": ["Mouse Pool", "31"]
//   }
// };

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      allKits: [],
      allConstantNames: [],
      rowCount: 0,
      currentSpecies: "No Species Selected",
      currentPosKits: [],
      currentNegKits: [],
      tableKitIDs: {},
      tableKitData: [],
      arrayedKitData: [],
      tableRowsHash: {},
      allSpecies: [],
      allKitIDs: {} //used for creating kit. checking if ID already exists
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
    await this.fetchKitsFromDatabase();
    this.getUser();
  };

  getUser = () => {
    apis.checkLoginStatus().then(response => {
      if (response.data.user) {
        console.log("Existing session; logged in.");
        this.setState({
          loggedIn: true
        });
      } else {
        console.log("No existing session.");
        this.setState({
          loggedIn: false
        });
      }
    });
  };

  setLoggedInStatus = bool => {
    this.setState({ loggedIn: bool });
  };

  fetchLocalStorage = async () => {
    console.log("Fetching state from local storage...");
    console.log("port", global.port);
    // const { data } = await axios.get("/api/login", { browserBaseURL: "/" });
    // console.log("the data", data);
    const localState = JSON.parse(localStorage.getItem("appState"));
    if (localState) {
      // do not need to store/fetch allKits or allSpecies, as those can change in the database and we want to always grab the newest update on loading app
      const {
        rowCount,
        currentSpecies,
        currentPosKits,
        currentNegKits,
        tableKitIDs,
        tableKitData,
        arrayedKitData,
        tableRowsHash
      } = localState;
      await this.setState({
        rowCount,
        currentSpecies,
        currentPosKits,
        currentNegKits,
        tableKitIDs,
        tableKitData,
        arrayedKitData,
        tableRowsHash
      });
    }
    console.log("State loaded.");
  };

  //grabs all kits from db, generates array of allSpecies, generates hash of allKitIDs
  //sets allKits, allSpecies, allKitIDs on state
  fetchKitsFromDatabase = async () => {
    console.log("Fetching kits from database...");
    const res = await apis.getAllKits();
    const responseData = res.data.data;

    const allKits = [];
    for (let kit of responseData) {
      //only grab the fields needed, excluding timestamps and database indices
      const { id, name, species, type, constants } = kit;
      allKits.push({
        id,
        name,
        species,
        type,
        constants
      });
    }

    const allSpecies = this.extractAllSpecies(allKits).sort();
    const allKitIDs = this.createKitIDHash(allKits);
    const allConstantNames = this.extractConstantNames(allKits);
    await this.setState({ allKits, allConstantNames, allSpecies, allKitIDs });
    console.log("All kits loaded.");
  };

  createKitIDHash = allKits => {
    let allKitIDs = new Set();
    for (let kit of allKits) {
      allKitIDs.add(kit.id);
    }
    return allKitIDs;
  };

  extractConstantNames = allKits => {
    let allConstants = [];
    for (let kit of allKits) {
      allConstants.push(...kit.constants);
    }

    let constantNamesSet = new Set();
    for (let constantPair of allConstants) {
      constantNamesSet.add(constantPair[0]);
    }

    const constantNames = Array.from(constantNamesSet).sort();
    const arrayedConstantNames = constantNames.map(constant => {
      let arr = constant.split(" (");
      arr[1] = "(".concat(arr[1]);
      return arr;
    });
    return arrayedConstantNames;
  };

  extractAllSpecies = allKits => {
    const speciesSet = new Set();
    for (let kit of allKits) {
      speciesSet.add(kit.species);
    }
    return Array.from(speciesSet);
  };

  updateLocalStorage = () => {
    localStorage.setItem("appState", JSON.stringify(this.state));
  };

  modifyRowCount = modification => {
    if (modification === "add")
      this.setState({ rowCount: this.state.rowCount + 1 });
    else if (modification === "subtract")
      this.setState({ rowCount: this.state.rowCount - 1 });
  };

  //finds the current species' kits in allKits. calls this.sortKits to separate into positive and negative kit arrays
  //sets currentSpecies, currentPosKits, currentNegKits on state
  selectSpecies = async currentSpecies => {
    const currentKits = this.state.allKits.filter(
      kit => kit.species === currentSpecies
    );
    const { currentPosKits, currentNegKits } = this.sortKits(currentKits);
    await this.setState({ currentSpecies, currentPosKits, currentNegKits });

    this.updateLocalStorage();
  };

  sortKits = currentKits => {
    const positiveKits = [];
    const negativeKits = [];

    for (let kit of currentKits) {
      if (kit.type === "Positive") positiveKits.push(kit);
      else if (kit.type === "Negative") negativeKits.push(kit);
    }
    return { currentPosKits: positiveKits, currentNegKits: negativeKits };
  };

  updateTable = async (modification, kit) => {
    let tableKitIDs = Object.assign({}, this.state.tableKitIDs);
    if (modification === "add") {
      tableKitIDs[kit.id] = (tableKitIDs[kit.id] || 0) + 1;

      let rowID = tableKitIDs[kit.id];
      let rowKey = kit.id + " " + rowID;
      await this.modifyTableRowsHash(modification, kit.species, rowKey);

      await this.modifyRowCount(modification);
      await this.setState({ tableKitIDs });
      //if the kit quantity is increased to 1, add its data to the tableKitData array
      if (tableKitIDs[kit.id] === 1) {
        await this.addKitData(kit.id);
      }
      console.log("App state after ADD:", this.state);
    } else if (modification === "subtract") {
      if (tableKitIDs[kit.id]) {
        //remove from tableRowsHash first, before decrementing tableKitIDs. need the correct rowID
        let rowID = tableKitIDs[kit.id];
        let rowKey = kit.id + " " + rowID;
        --tableKitIDs[kit.id];
        await this.setState({ tableKitIDs });
        await this.modifyTableRowsHash(modification, kit.species, rowKey);

        await this.modifyRowCount(modification);
      }

      //if the kit quantity is zero, remove its data from the tableKitData array
      if (!tableKitIDs[kit.id]) {
        await this.removeKitData(kit.id);
      }
      console.log("App state after REMOVE:", this.state);
    }

    this.updateLocalStorage();
  };

  addKitData = async kitID => {
    //find the correct kit from allKits and add to the table
    for (let kit of this.state.allKits) {
      if (kit.id === kitID) {
        const tableKitData = [...this.state.tableKitData, kit];
        const arrayedKitData = this.hashifyKitData(tableKitData);
        await this.setState({
          tableKitData,
          arrayedKitData
        });
        return;
      }
    }
    console.log("Kit not found in allKits.");
    return;
  };

  removeKitData = kitID => {
    const tableKitData = this.state.tableKitData;
    const filteredKitData = tableKitData.filter(kit => kit.id !== kitID);
    const arrayedKitData = this.hashifyKitData(filteredKitData);
    this.setState({ tableKitData: filteredKitData, arrayedKitData });
  };

  updateTableKitData = kitID => {
    //grab the updated kit from allKits, which has been re-pulled from db
    let updatedKit = {};
    for (let kit of this.state.allKits) {
      if (kit.id === kitID) {
        updatedKit = kit;
        break;
      }
    }
    //find the kit in tableKitData and replace it
    const tableKitData = cloneDeep(this.state.tableKitData);
    for (let i = 0; i < tableKitData.length; i++) {
      if (tableKitData[i].id === kitID) {
        tableKitData[i] = updatedKit;
      }
    }
    //generate arrayedKitData for Table to use
    const arrayedKitData = this.hashifyKitData(tableKitData);
    this.setState({ tableKitData, arrayedKitData });
  };

  hashifyKitData = tableKitData => {
    const kitDataHash = {};
    for (let kit of tableKitData) {
      kitDataHash[kit.species] = (kitDataHash[kit.species] || []).concat(kit);
    }
    return this.arrayifyKitData(kitDataHash);
  };

  arrayifyKitData = kitDataHash => {
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

  updateRowCellCount = async (inputType, species, rowKey, input) => {
    const tableRowsHash = cloneDeep(this.state.tableRowsHash);

    if (inputType === "cellCount") {
      tableRowsHash[species][rowKey][1] = input;
    } else if (inputType === "sampleID") {
      tableRowsHash[species][rowKey][0] = input;
    }

    await this.setState({ tableRowsHash });

    this.updateLocalStorage();
  };

  deleteSpeciesFromTable = async species => {
    let clone = cloneDeep(this.state);
    let {
      rowCount,
      tableKitIDs,
      tableKitData,
      arrayedKitData,
      tableRowsHash
    } = clone;

    //grab the number of rows that will be deleted, subtract from tableRows
    const speciesRows = tableRowsHash[species];
    const numRows = Object.keys(speciesRows).length;
    rowCount -= numRows;
    //delete the entire species and its rows from the hash table
    delete tableRowsHash[species];
    //delete kits from the species, from tableKitData array. at the same time, store the IDs of any kits deleted
    let IDs = [];
    tableKitData = tableKitData.filter(kit => {
      if (kit.species !== species) return true;
      IDs.push(kit.id);
      return false;
    });
    //delete kits from tableKitIDs using the IDs grabbed during the modification of tableKitData
    for (let ID of IDs) delete tableKitIDs[ID];
    //delete species from arrayedKitData
    arrayedKitData = arrayedKitData.filter(group => group[0] !== species);

    await this.setState({
      rowCount,
      tableKitIDs,
      tableKitData,
      arrayedKitData,
      tableRowsHash
    });

    this.updateLocalStorage();
  };

  deleteKitFromTable = async (kitID, kitSpecies) => {
    let clone = cloneDeep(this.state);
    let { rowCount, tableKitIDs, tableKitData, tableRowsHash } = clone;

    //grab the number of rows that will be deleted, subtract from rowCount
    let numRows = 0;
    const kitsHash = tableRowsHash[kitSpecies];
    for (let kit in kitsHash) {
      if (kit.slice(0, -2) === kitID) {
        ++numRows;
        delete kitsHash[kit];
      }
    }
    rowCount -= numRows;
    //delete kits from tableKitIDs
    for (let kit in tableKitIDs) {
      if (kit === kitID) delete tableKitIDs[kit];
    }

    //delete kit from tableKitData
    tableKitData = tableKitData.filter(kit => kit.id !== kitID);

    //delete species from arrayedKitData
    const arrayedKitData = this.hashifyKitData(tableKitData);

    await this.setState({
      rowCount,
      tableKitIDs,
      tableKitData,
      arrayedKitData,
      tableRowsHash
    });

    this.updateLocalStorage();
  };

  clearTable = async () => {
    await this.setState({
      rowCount: 0,
      tableKitIDs: {},
      tableKitData: [],
      arrayedKitData: [],
      tableRowsHash: {}
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
            render={props => (
              <Kits
                {...props}
                loggedIn={this.state.loggedIn}
                currentSpecies={this.state.currentSpecies}
                currentPosKits={this.state.currentPosKits}
                currentNegKits={this.state.currentNegKits}
                rowCount={this.state.rowCount}
                tableKitIDs={this.state.tableKitIDs}
                updateTable={this.updateTable}
              />
            )}
          ></Route>

          {/* <Route
            path="/edit/:kitID"
            render={props => (
              <CreateOrEdit
                {...props}
                allConstantNames={this.state.allConstantNames}
                rowCount={this.state.rowCount}
                allKitIDs={this.state.allKitIDs}
                currentSpecies={this.state.currentSpecies}
                allSpecies={this.state.allSpecies}
                fetchKitsFromDatabase={this.fetchKitsFromDatabase}
                selectSpecies={this.selectSpecies}
                updateTableKitData={this.updateTableKitData}
              />
            )}
          ></Route> */}

          <PrivateRoute
            path="/edit/:kitID"
            component={CreateOrEdit}
            loggedIn={this.state.loggedIn}
            allConstantNames={this.state.allConstantNames}
            rowCount={this.state.rowCount}
            allKitIDs={this.state.allKitIDs}
            currentSpecies={this.state.currentSpecies}
            allSpecies={this.state.allSpecies}
            fetchKitsFromDatabase={this.fetchKitsFromDatabase}
            selectSpecies={this.selectSpecies}
            updateTableKitData={this.updateTableKitData}
          ></PrivateRoute>

          {/* <Route
            path="/create"
            render={props => (
              <CreateOrEdit
                {...props}
                allConstantNames={this.state.allConstantNames}
                allKits={this.allKits}
                rowCount={this.state.rowCount}
                allKitIDs={this.state.allKitIDs}
                currentSpecies={this.state.currentSpecies}
                allSpecies={this.state.allSpecies}
                fetchKitsFromDatabase={this.fetchKitsFromDatabase}
                selectSpecies={this.selectSpecies}
              />
            )}
          ></Route> */}

          <PrivateRoute
            path="/create"
            component={CreateOrEdit}
            loggedIn={this.state.loggedIn}
            allConstantNames={this.state.allConstantNames}
            allKits={this.allKits}
            rowCount={this.state.rowCount}
            allKitIDs={this.state.allKitIDs}
            currentSpecies={this.state.currentSpecies}
            allSpecies={this.state.allSpecies}
            fetchKitsFromDatabase={this.fetchKitsFromDatabase}
            selectSpecies={this.selectSpecies}
          ></PrivateRoute>

          <Route
            path="/table"
            render={props => (
              <Table
                {...props}
                loggedIn={this.state.loggedIn}
                tableKitIDs={this.state.tableKitIDs}
                tableKitData={this.state.tableKitData}
                arrayedKitData={this.state.arrayedKitData}
                tableRowsHash={this.state.tableRowsHash}
                selectSpecies={this.selectSpecies}
                updateTable={this.updateTable}
                updateRowCellCount={this.updateRowCellCount}
                deleteSpeciesFromTable={this.deleteSpeciesFromTable}
                deleteKitFromTable={this.deleteKitFromTable}
                clearTable={this.clearTable}
              />
            )}
          ></Route>

          <Route
            path="/"
            exact={true}
            render={props => (
              <Home
                {...props}
                rowCount={this.state.rowCount}
                allSpecies={this.state.allSpecies}
                selectSpecies={this.selectSpecies}
              />
            )}
          ></Route>

          <Route path="/error" render={props => <Error {...props} />}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
