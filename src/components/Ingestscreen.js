import React, {Component} from "react";
import CSVReader from 'react-csv-reader'
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core/';

import './ingestScreen.css'

class Ingestscreen extends Component {
    state = {
        file: "Select your file!",
        dropdownItems: ['LastPass (csv)', 'Bitwarden (csv)', "1Password", "Chrome (csv)"],
        selectedItem: "LastPass (csv)",
    }

    componentDidMount() {

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
    handleChange = (event) => {
        this.props.handleDropdown(event.target.value)
        this.setState({selectedItem: event.target.value})
    }


    render() {
        return (
            <div>
                <div className="inputcontainer">
                    <form className="formcss">
                        <div className={"file-upload-wrapper"} data-text={this.state.file}>
                            <CSVReader onFileLoaded={(data, fileInfo) => this.props.handleData(data, fileInfo)}/>
                        </div>
                    </form>
                    <div className={"dropdowncss"}>
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
            </div>

        )
    }
}

export default Ingestscreen