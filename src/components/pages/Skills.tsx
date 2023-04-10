import {StarBorderRounded, StarRounded} from "@material-ui/icons";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import theme from "../AppStyles";
import Card from "@material-ui/core/Card";

function Skill(props: any) {

    const padding = 10;

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
        </Card>
    );
}

export default function Skills(props: any) {

    let skillList = [];
    // for (let i=0; i<20; i++) {
    //     let rating = Math.floor(Math.random() * 6);
    //     let title = `Skill ${i+1}`;
    //     skillList.push(<Skill rating={rating}>{title}</Skill>);
    // }

    skillList.push(<Skill>Typescript</Skill>);
    skillList.push(<Skill>Javascript</Skill>);
    skillList.push(<Skill>Java</Skill>);
    skillList.push(<Skill>Python</Skill>);
    skillList.push(<Skill>C</Skill>);
    skillList.push(<Skill>C#</Skill>);
    skillList.push(<Skill>C++</Skill>);
    skillList.push(<Skill>Kotlin</Skill>);
    skillList.push(<Skill>Matlab</Skill>);
    skillList.push(<Skill>R</Skill>);
    skillList.push(<Skill>Lisp</Skill>);
    skillList.push(<Skill>Maple</Skill>);

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