import { Alert } from '@mui/material';
import React from 'react'

export default function AlertMsg(props) {
    return (
      <div>
        {props.msg === 'success' ? (
          <Alert severity="success">This is a success alert — check it out!</Alert>
        ) : (
            <Alert severity="warning">This is a warning alert — check it out!</Alert>
        )}
      </div>
    );
  }
  