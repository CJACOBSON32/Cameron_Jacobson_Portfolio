import React from 'react';
import Box from "@material-ui/core/Box";
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const linkedIn = {
        __html: `<div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US"
                      data-type="horizontal" data-theme="dark" data-vanity="cameron-jacobson-006779186">
                    <a class="LI-simple-link" href=\'https://www.linkedin.com/in/cameron-jacobson-006779186?trk=profile-badge\'>Cameron Jacobson</a>
                  </div>`
};

function Contact() {

    function openGitHub() {
        window.open("https://github.com/CJACOBSON32", '_blank');
    }

    return (
        <Box style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 20, flexDirection: "column"}}>
            <Box style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 20}}>
                <Box style={{display: "flex", alignItems: "center"}}>
                    <Button onClick={openGitHub} style={{width: 65, height: 65, borderRadius: "50%"}}>
                        <GitHubIcon fontSize="large"/>
                    </Button>
                    <Typography>@CJACOBSON32</Typography>
                </Box>


            </Box>
            <div dangerouslySetInnerHTML={linkedIn}/>
        </Box>
    );
}

export default Contact;