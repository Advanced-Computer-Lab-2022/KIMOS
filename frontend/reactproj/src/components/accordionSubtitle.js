import React, { useState } from 'react';
import Button from '@mui/material/Button';
import useStyles from '../styles/accordionSubtitle.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  maxWidth: 30,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function AccordionSubtitle(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="accordionSubtitle__section">
      <button
        className="accordionSubtitle"
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}>
        <p classname="accordion__title">{props.title}</p>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded}>
          <ExpandMoreIcon />
        </ExpandMore>
      </button>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="accordionSubtitle__content">
          {/* <div className="accordion__text" dangerouslySetInnerHTML={{__html:props.videoSubtitle}}/> */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '12px'
            }}>
            <a style={{ color: 'black' }} href={props.link}>
              {' '}
              <PlayCircleIcon cursor="pointer"> </PlayCircleIcon>
            </a>
            <a style={{ color: '#3E424B' }} href={props.link}>
              Video
            </a>
            <label>({props.duration})</label>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
