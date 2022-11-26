import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating(props) {
  const [value, setValue] = React.useState();

  return (
    <div>
        <Rating name="read-only" value={parseInt(props.value)} precision={0.5} readOnly />
    </div>


  );
}