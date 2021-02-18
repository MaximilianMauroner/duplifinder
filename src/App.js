import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
import DisplayDouplicatePW from "./DisplayDouplicatePW";
import {Select, FormControl, MenuItem, InputLabel, Button} from '@material-ui/core/';

import './fileuploader.css'


class App extends Component {
    state = {
        doubles: [],
        loadedData: false,
        file: "Select your file!(LastPass only)",
        dropdownItems: ['LastPass (csv)', 'Bitwarden (csv)', "1Password", "Chrome (csv)"],
        selectedItem: "LastPass (csv)",
        items: []
    }

    componentDidMount() {
    }

    isPWinDataset = (doubles, data) => {
        for (let i = 0; i < doubles.length; i++) {
            // if (data[0] === "http://sn" || data[0] === "http://") {
            //     return doubles;
            // }

            if (data[2] && doubles[i][0][2] === data[2]) {
                let temp = doubles[i]
                doubles.splice(i, 1);
                temp.push(data)
                doubles.push(temp)
                return doubles;
            }
        }
        let temp = []
        temp.push(data)
        doubles.push(temp)
        return doubles;
    }

    getAllDouplicates = (doubles) => {
        let samePW = []
        for (let i = 0; i < doubles.length; i++) {
            if (doubles[i].length > 1) {
                samePW.push(doubles[i])
            }
        }
        samePW.sort((a, b) => a.length - b.length)


        this.setState({
            doubles: samePW,
            loadedData: true
        })
    }

    handleData = (data, fileInfo) => {
        this.setState({
            file: fileInfo.name,
            loadedData: false,
            doubles: []
        })
        this.setState({disabled: true})
        let pwdata = []
        data = this.reformatData(data)
        for (let i = 1; i < data.length; i++) {
            pwdata = this.isPWinDataset(pwdata, data[i])
        }
        this.getAllDouplicates(pwdata)
    }

    reformatData = (data) => {
        if (this.state.selectedItem === 'LastPass (csv)') {
            return data
        } else if (this.state.selectedItem === 'Bitwarden (csv)') {
            return reformBitwarden(data)
        }

        function reformBitwarden(data) {
            let retdata = []
            for (let i = 0; i < data.length; i++) {
                let temp = []
                temp.push(data[i][6])
                temp.push(data[i][7])
                temp.push(data[i][8])
                temp.push(data[i][3])
                temp.push(data[i][2])
                temp.push(data[i][1])
                retdata.push(temp)
            }
            return retdata;
        }
    }


    resetData = () => {
        this.setState({
            doubles: [],
            loadedData: false,
            file: "Select your file!"
        })
    }
    handleChange = (event) => {
        this.setState({selectedItem: event.target.value})
    }

    setItems = () => {
        let arr = [];
        for (let i = 0; i < this.state.dropdownItems.length; i++) {
            if (this.state.dropdownItems[i] === "1Password" || this.state.dropdownItems[i] === "Chrome (csv)") {
                arr.push(
                    <MenuItem disabled={true} value={this.state.dropdownItems[i]}>{this.state.dropdownItems[i]}</MenuItem>
                )
            } else {
                arr.push(
                    <MenuItem value={this.state.dropdownItems[i]}>{this.state.dropdownItems[i]}</MenuItem>
                )
            }

        }
        return arr
    }


    render() {
        if (this.state.loadedData) {
            return (
                <div>
                    <div className={"justify-content-md-center w-100"}>
                        <div>
                            <Button className={"again-upload"} onClick={this.resetData}/>
                        </div>
                        <div className="accordioncontainer w-100">
                            <div className={"justify-content-center w-100"}>
                                <DisplayDouplicatePW data={this.state.doubles}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <footer className={"footer"}>
                            <a target={"_blank"} href={"https://github.com/MaximilianMauroner/duplifinder"}>Git Hub</a>
                        </footer>
                    </div>
                </div>

            )
        }

        return (
            <div>
                <div className="inputcontainer">
                    <form className="form">
                        <div className={"file-upload-wrapper"} data-text={this.state.file}>
                            <CSVReader onFileLoaded={(data, fileInfo) => this.handleData(data, fileInfo)}/>
                        </div>
                    </form>
                    <div className={"dropdown"}>
                        <FormControl variant="outlined" className={"formControl"}>
                            <InputLabel id="pwdropdown">Password Manager</InputLabel>
                            <Select
                                labelId="pwdropdown"
                                id="pwselectdropdown"
                                label="LastPass (csv)"
                                value={this.state.selectedItem}
                                onChange={this.handleChange}
                            >
                                {this.setItems()}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div>
                    <footer className={"footer"}>
                        <a target={"_blank"} href={"https://github.com/MaximilianMauroner/duplifinder"}>Git Hub</a>
                    </footer>
                </div>
            </div>
        )
    }
}

export default App;
