import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
import DisplayDouplicatePW from "./DisplayDouplicatePW";
import Button from '@material-ui/core/Button';
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus';

import './fileuploader.css'


class App extends Component {
    state = {
        doubles: [],
        loadedData: false,
        file: "Select your file!(LastPass only)"
    }

    componentDidMount() {
    }

    pwIsInDoubles = (doubles, data) => {

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

    getDoubles = (doubles) => {
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

    checkDoubles = (data, fileInfo) => {
        this.setState({
            file: fileInfo.name,
            loadedData: false,
            doubles: []
        })
        this.setState({disabled: true})
        let pwdata = []
        for (let i = 1; i < data.length; i++) {
            pwdata = this.pwIsInDoubles(pwdata, data[i])
        }
        this.getDoubles(pwdata)
    }


    resetData = () => {
        this.setState({
            doubles: [],
            loadedData: false,
            file: "Select your file!(LastPass only)"
        })
    }


    render() {
        if (this.state.loadedData) {
            return (
                <div className={"justify-content-md-center"}>
                    <div className="container">
                        <div className={"w-50 justify-content-center"}>
                            <DisplayDouplicatePW data={this.state.doubles}/>
                        </div>
                    </div>
                    <div>
                        <Button className={"again-upload"} onClick={this.resetData}/>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="container">
                    <form className="form">
                        <div className={"file-upload-wrapper"} data-text={this.state.file}>
                            <CSVReader onFileLoaded={(data, fileInfo) => this.checkDoubles(data, fileInfo)}/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default App;
