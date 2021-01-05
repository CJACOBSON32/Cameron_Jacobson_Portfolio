import {withStyles} from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React from "react";

const StubbyTabs = withStyles((theme) => ({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '50%',
            backgroundColor: theme.palette.secondary.A200,
            //backgroundColor: '#e78e5e',
        },
    },
}))((props: any) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const spacing = 0;

const StubbyTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(spacing) / 2,
        marginLeft: theme.spacing(spacing) / 2,
        minWidth: 10,
        '&:focus': {
            opacity: 1,
        },
    },
}))((props: any) => <Tab disableRipple {...props} />);

export {StubbyTab, StubbyTabs};