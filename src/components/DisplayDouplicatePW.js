import React from 'react';
import {Row, Card, Col} from "react-bootstrap";
import {Button, AccordionDetails, Accordion, AccordionSummary, Typography} from '@material-ui/core/';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './displayDouplicates.css'


const DisplayDouplicatePW = ({data, resetData, next}) => {
    const [expanded, setExpanded] = React.useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);

    };
    let ret = []

    for (let i = 0; i < data.length; i++) {
        let temp = []
        for (let j = 0; j < data[i].length; j++) {
            temp.push(
                <Row>
                    <Col className={"card-text"}>
                        <Card.Title>

                            <b>Name: </b>{data[i][j][4]}
                        </Card.Title>
                        <Card.Subtitle>
                            <b>username: </b>{data[i][j][1]}
                        </Card.Subtitle>
                        <b>URL: </b>
                        <a target="_blank" href={data[i][j][0]}>
                            <Card.Link>
                                {data[i][j][0]}
                            </Card.Link>
                        </a>
                    </Col>
                </Row>
            )

            if (j < data[i].length - 1) {
                temp.push(<hr className="solid"/>)
            }


        }
        ret.push(
            <Accordion expanded={expanded === i} onChange={handleChange(i)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls={"panel" + i + "bh-content"}
                    id={i}
                >
                    <Typography className={"headingcss"}>Same Passwords</Typography>
                    <Typography className={"secondaryHeading"}>{data[i].length}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {temp}
                    </div>
                </AccordionDetails>
            </Accordion>
        )
    }
    return (
        <div className={"justify-content-md-center"}>

            <Row>
                <Col>
                    <div className={"centering"}>
                        <Row>
                            <Col md={1}>
                                <Button className={""} onClick={resetData}>Back</Button>
                            </Col>
                            <Col md={{span: 1, offset: 10}}>
                                <Button className={"centering"} onClick={next}>Next</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className={"loadcontainer"}>
                        {ret}
                    </div>
                </Col>
            </Row>


        </div>

    );
}


export default DisplayDouplicatePW
