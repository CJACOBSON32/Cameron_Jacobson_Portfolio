import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ProfilePic from "../../Assets/CJacobson_Summer_Lab.jpg";
import React from "react";
import "../../css/Resume.css";

function Profile(props: any) {
    return (
        <Box className="horizontal-flex" {...props}>
            {/*Left Section*/}
            <Box className="flex-item">
                <Typography variant="h4">About Me</Typography>
                <div className="content">
                    <p>
                        A full stack web, android, and systems engineer looking for a fulltime position in the summer of 2023.
                    </p>
                </div>
            </Box>

            {/*Profile Picture*/}
            <img src={ProfilePic} className="profile-img" alt="Cameron Jacobson"/>

            {/*Right Section*/}
            <Box className="flex-item">
                <Typography variant="h4">Details</Typography>
                <div className="content">
                    <div className="detail-field">
                        <Typography variant="h6">Name</Typography>
                        <p>Cameron Hyun-Jin Jacobson</p>
                    </div>
                    <div className="detail-field">
                        <Typography variant="h6">Location</Typography>
                        <p>Brooklyn, NY</p>
                    </div>
                </div>
            </Box>
        </Box>

    );
}

export default Profile;