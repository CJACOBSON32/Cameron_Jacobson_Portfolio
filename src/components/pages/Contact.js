import React from 'react';
import Box from "@material-ui/core/Box";
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EmailIcon from '@material-ui/icons/Email';

const linkedIn = {
        __html: `<div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US"
                      data-type="horizontal" data-theme="dark" data-vanity="cameron-jacobson-006779186">
                    <a class="LI-simple-link" href=\'https://www.linkedin.com/in/cameron-jacobson-006779186?trk=profile-badge\'>Cameron Jacobson</a>
                  </div>`
};

function ContactButton(props) {

    function openLink() {
        window.open(props.link, '_blank');
    }

    return (
        <Box style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Button onClick={openLink} style={{width: 65, height: 65, borderRadius: "50%"}}>
                {props.children}
            </Button>
            <Typography>{props.text}</Typography>
        </Box>
    );
}

function Contact() {



    return (
        <Box style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 50, flexDirection: "column"}}>
            <Box style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 60}}>
                <ContactButton text="@CJACOBSON32" link="https://github.com/CJACOBSON32"><GitHubIcon fontSize="large"/></ContactButton>
                <ContactButton text="chjacobson@wpi.edu" link="mailto:chjacobson@wpi.edu"><EmailIcon fontSize="large"/></ContactButton>
            </Box>
            <div dangerouslySetInnerHTML={linkedIn}/>
        </Box>
    );
}

export default Contact;