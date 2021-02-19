import React, {Component} from 'react'

import DisplayDouplicatePW from "./components/DisplayDouplicatePW";
import Ingestscreen from "./components/Ingestscreen";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Select, FormControl, MenuItem, InputLabel, Button} from '@material-ui/core/';
import {Col, Row} from 'react-bootstrap'

import './App.css'


class App extends Component {
    state = {
        doubles: [],
        loadedData: false,
        file: "Select your file!",
        dropdownItems: ['LastPass (csv)', 'Bitwarden (csv)', "1Password", "Chrome (csv)"],
        selectedItem: "LastPass (csv)",
        items: [],
        step: 0
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
            loadedData: true,
            step: 1
        })
        console.log("yes")
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
                temp.push(data[i][2])
                temp.push(data[i][3])
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
            step: 0,
            file: "Select your file!"
        })
    }


    back = () => {

    }
    foreward = () => {
        this.setState({step: 2})
    }

    handleDropdown = (value) => {
        this.setState({selectedItem: value})
    }

    render() {
        let footer = (
            <div>
                <footer className={"footer"}>
                    <a target={"_blank"} href={"https://github.com/MaximilianMauroner/duplifinder"}>Git Hub</a>
                </footer>
            </div>
        )
        if (this.state.step === 0) {
            return (
                <div>
                    <Ingestscreen handleDropdown={this.handleDropdown} handleData={this.handleData}/>
                    {footer}
                </div>
            )
        }
        if (this.state.step === 1) {
            return (
                <div>
                    <div>
                        <Button className={"again-upload"} onClick={this.resetData}/>
                    </div>
                    <DisplayDouplicatePW resetData={this.resetData} next={this.foreward} data={this.state.doubles}/>
                    {footer}
                </div>
            )
        }
        if (this.state.step === 2) {
            return (
                <div>
                    <div>
                        <Button className={"again-upload"} onClick={this.resetData}/>
                    </div>
                    {footer}
                </div>
            )
        }

    }

}

export default App;
