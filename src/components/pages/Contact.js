import React from 'react';
import Box from "@material-ui/core/Box";

const linkedIn = {
        __html: `<div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US"
                      data-type="horizontal" data-theme="dark" data-vanity="cameron-jacobson-006779186">
                    <a class="LI-simple-link" href=\'https://www.linkedin.com/in/cameron-jacobson-006779186?trk=profile-badge\'>Cameron Jacobson</a>
                  </div>`
};

const gitHub = {
    __html: `<div class="github-card" data-github="CJACOBSON32" data-width="400" data-height="150" data-theme="default"></div>`
};

function Contact() {

    return (
        <Box>
            <div dangerouslySetInnerHTML={linkedIn}/>
        </Box>

    );
}

export default Contact;