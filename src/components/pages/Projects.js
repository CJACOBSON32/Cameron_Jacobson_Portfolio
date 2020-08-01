import React from 'react';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

function Project(props) {

    let width = 350;

    if (props.width !== undefined)
        width = props.width;

    return (
        <Card style={{padding: 10, width: width}}>
            <Typography variant="h5">{props.title}</Typography>
            <p>
                {props.children}
            </p>
        </Card>
    );
}

function Projects() {

    const numberOfProjects = 9;
    let projects = [];

    for(let i=1; i<=numberOfProjects; i++) {
        let title = `Project ${i}`;
        projects.push(
            <Project title={title}>
                Lorem ipsum dolor sit amet, no cum clita consequat, nostrud tractatos adolescens eam ei. At consulatu
                honestatis accommodare has. Ei cibo eirmod expetenda sit, ea choro dicam invidunt sit. Luptatum deseruisse
                ut his, eum ne ponderum scriptorem repudiandae. Est ei accusata consulatu, dolor fabellas sit ut, vis ad
                probo erant partem. Mea ea enim nibh fuisset.
            </Project>
        );
    }

    return (
        <Container>
            <Box style={{display: "flex", gap: 20, margin: 20, flexWrap: "wrap"}}>
                {projects}
            </Box>
        </Container>
    );
}

export default Projects;