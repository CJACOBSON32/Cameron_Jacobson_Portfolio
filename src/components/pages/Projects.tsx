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
                <Button variant="text" color="primary" href={props.link}>Go To</Button>
            </Box>
        </Card>
    );
}

class Projects extends React.Component {

    render() {
        const ueWidth: number = 400;
        const iframeWidth: number = ueWidth - 20;
        const iframeHeight: number = iframeWidth * (315/560);

        return (
            <Container>
                <Box style={{display: "flex", gap: 20, margin: 20, flexWrap: "wrap", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "1100px"}}>
                    <Project title="Unreal Engine 4 Hallway Illusion" description={"I created this in Unreal engine 4. It utilizes some trigger volumes to give the illusion of an impossible hallway."}>
                        <Box>
                            <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/GyI9xKsXMiQ"
                                    frameBorder="0"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
                                    allowFullScreen/>
                        </Box>
                    </Project>
	                <Project
		                title="Emoji Place"
	                    description={`
		                    Welcome to Emoji Place! Similar to r/place, but rather than putting a colored square on a grid, 
		                    the user can put an emoji. r/place was a project by reddit that allowed users to draw on a 1000 
		                    by 1000 pixel canvas. Each user was able to place one pixel every 5 minutes. Our project is 
		                    targeted towards an audience similar to Reddit's for the purpose of artistic creativity.
	                    `}
	                    link={"https://github.com/CJACOBSON32/cs4241_emoji_place"}>
	                </Project>
	                <Project
		                title="Inkboard"
		                description={`
		                    Inkboard is a synced canvas for people to work together and contribute to a collaborative 
		                    drawing. Users can log in draw strokes with custom colors and thickness. Users can also clear 
		                    the canvas of strokes that they have made. The server will differentiate which strokes were 
		                    added by which user and update the database accordingly.
	                    `}
		                link={"https://github.com/CJACOBSON32/cs4241_Inkboard"}>
	                </Project>
	                <Project
		                title="Project Hexabase"
		                description={`
		                    Project Hexabase is an ongoing unity package focused on the procedural animation of 
		                    creatures with legs.
	                    `}
		                link={"https://github.com/CJACOBSON32/project_hexabase"}>
		                <video src={"https://user-images.githubusercontent.com/34342644/188280432-5cdf1e99-7fea-4355-a165-1a62f281211b.mp4"}
		                    autoPlay={true} playsInline={true} loop={true}></video>
	                </Project>
	                <Project
		                title="Project Geoblade"
		                description={`
		                    A 3D third-person action-adventure game in which audio plays an integral role. The game 
		                    blends melee combat and puzzle-solving gameplay in a narratively rich, location-driven story.
	                    `}
		                link={"https://wp.wpi.edu/showfest/project/geoblade/"}>
		                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/z4BUox3BMmw"
		                        frameBorder="0"
		                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
		                        allowFullScreen/>
	                </Project>
	                <Project
		                title="Bitcoin Blitz"
		                description={`
		                    Bitcoin Blitz is a satirical mobile idle game centered around mining fictional Bitcoin. 
		                    The gameplay loop revolves around actively tapping to increase the user’s bitcoin. This game 
		                    was created entirely using the Native Android SDK.
	                    `}
		                link={"https://github.com/CJACOBSON32/Bitcoin_Blitz"}>
	                </Project>
                </Box>
            </Container>
        );
    }
}

export default Projects;