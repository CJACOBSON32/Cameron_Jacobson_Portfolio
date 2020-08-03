import {StarBorderRounded, StarRounded} from "@material-ui/icons";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import theme from "../AppStyles";
import Card from "@material-ui/core/Card";
import CSVToArray from "../utils/csvReader";

function Skill(props) {

    const gap = 0;
    const height = 40;
    const padding = 10;
    const contentHeight = height - (2*padding);

    const starStyle = {
        marginRight: gap-4,
        marginLeft: gap-4,
        height: contentHeight
    };

    let stars = [];

    let i = 1;
    for (i=i; i<=props.rating; i++) stars.push(<StarRounded style={starStyle}/>);

    for (i=i; i<= 5; i++) stars.push(<StarBorderRounded style={starStyle}/>);

    return (
        <Card style={{
            display: "flex",
            justifyContent: "space-between",
            width: 300,
            padding: padding,
            backgroundColor: theme.palette.background.paper,
            alignItems: "center"
        }}>
            <Typography style={{fontSize: "100%"}}>{props.children}</Typography>
            <div style={{display: "flex", alignItems: "center"}}>
                {stars}
            </div>
        </Card>
    );
}

export default function Skills(props) {
    // Extract matrix of data from csv
    CSVToArray()

    let skillList = [];
    for (let i=0; i<20; i++) {
        let rating = Math.floor(Math.random() * 6);
        let title = `Skill ${i+1}`;
        skillList.push(<Skill rating={rating}>{title}</Skill>);
    }

    return (
        <Box {...props}>
            <Container style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10
            }}>
                {skillList}
            </Container>
        </Box>
    );
}