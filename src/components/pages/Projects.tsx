import React from 'react';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";

const defaultWidth: number = 350;

function Project(props: any) {

    let width = defaultWidth;

    if (props.width !== undefined)
        width = props.width;

    return (
        <Card style={{display: "flex", flexDirection: "column", padding: 10, width: width}}>
            <Typography variant="h5">{props.title}</Typography>
            <p>
                {props.description}
            </p>
            {props.children}
            <Box marginTop="20px" flexGrow="1" style={{display: "flex", alignItems: "flex-end", justifyContent: "flex-end"}}>
                <Button variant="text" color="primary">Expand</Button>
            </Box>
        </Card>
    );
}

class Projects extends React.Component {

    render() {
        const numberOfProjects: number = 9;
        let projects: JSX.Element[] = [];

        for (let i: number = 1; i <= numberOfProjects; i++) {
            let title = `Project ${i}`;
            projects.push(
                <Project title={title}
                         description={"Lorem ipsum dolor sit amet, no cum clita consequat, nostrud tractatos adolescens eam ei. At consulatu"
                         + "honestatis accommodare has. Ei cibo eirmod expetenda sit, ea choro dicam invidunt sit. Luptatum deseruisse"
                         + "ut his, eum ne ponderum scriptorem repudiandae. Est ei accusata consulatu, dolor fabellas sit ut, vis ad"
                         + "probo erant partem. Mea ea enim nibh fuisset."}/>
            );
        }

        const ueWidth: number = 400;
        const iframeWidth: number = ueWidth - 20;

        return (
            <Container>
                <Box style={{display: "flex", gap: 20, margin: 20, flexWrap: "wrap", justifyContent: "center"}}>
                    <Project width={ueWidth} title="Unreal Engine 4 Hallway Illusion" description={"I created this in Unreal engine 4. It utilizes some trigger volumes to give the illusion of an impossible Hallway."}>
                        <iframe width={iframeWidth} height={iframeWidth * (315/560)} src="https://www.youtube.com/embed/GyI9xKsXMiQ"
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                                allowFullScreen/>
                    </Project>
                    {projects}
                </Box>
            </Container>
        );
    }
}

export default Projects;