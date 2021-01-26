import React from 'react'
import { Box, Typography } from '@material-ui/core'

const TabPanel = ({children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby ={`nav-tab-${index}`}
            {...other}
        >
            { value === index && (
                <Box>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

export default TabPanel