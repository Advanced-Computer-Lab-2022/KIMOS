import React, { useState } from 'react';

import Button from '@mui/material/Button';
import useStyles from '../styles/accordion.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import SecondaryButton from './buttons/secondaryBtn';

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

export default function Accordion(props) {
  const viewExam = (event) => {
    const exam_id = event.target.id;
    props.changeViewExam(true);
    props.changeCurrentExam(exam_id);
  };

  const viewSolution = (event) => {
    const exam_id = event.target.id;
    props.changeSolveExam(true);
    props.changeCurrentExam(exam_id);
  };
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="accordion__section">
      <button
        className="accordion"
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}>
        <p className="accordion__title">{props.title}</p>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded}>
          <ExpandMoreIcon />
        </ExpandMore>
      </button>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="accordion__content">
          {props.content !== 'Grade: undefined' && (
            <div className="accordion__text" dangerouslySetInnerHTML={{ __html: props.content }} />
          )}
          {!props.solved ? (
            <Button
              variant="outlined"
              style={{ borderColor: '#3E424B', color: '#3E424B', maxWidth: '110px' }}
              id={props.examId}
              onClick={viewExam}>
              Solve
            </Button>
          ) : (
            <Button
              variant="outlined"
              style={{ borderColor: '#3E424B', color: '#3E424B', maxWidth: '110px' }}
              id={props.examId}
              onClick={viewSolution}>
              View Solution
            </Button>
          )}
        </div>
      </Collapse>
    </div>
  );
}
