import React from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material";
import {grey} from "@mui/material/colors";

export default styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}))