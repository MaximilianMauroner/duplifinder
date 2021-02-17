import React from 'react';
import {Row, Card, Col} from "react-bootstrap";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './displayDouplicates.css'



const DisplayDouplicatePW = ({data}) => {
    const [expanded, setExpanded] = React.useState(false);

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
                            <b>Name:</b> {data[i][j][4]}
                        </Card.Title>
                        <Card.Subtitle>
                            <b>username: </b>{data[i][j][1]}
                        </Card.Subtitle>
                        <Card.Link>
                            <b>URL: </b> {data[i][j][0]} <a target="_blank" href={data[i][j][0]}> click</a>
                        </Card.Link>
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
                    <Typography className={"heading"}>Same Passwords</Typography>
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
        <div className={"loadcontainer"}>
            {ret}
        </div>
    );
}


export default DisplayDouplicatePW
