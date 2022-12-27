import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Stack } from '@mui/system';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';

// course.title, course.price, course.discount, course.totalHours, course.subtitles
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="right-end" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 420,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  margin: 10,
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const courseDetails = (
  props,
  title,
  price,
  discount,
  totalHours,
  subtitles,
  subject,
  exercises
) => {
  var stringPrice = Math.ceil(price * props.rateAndSymbol.rate) + ' ' + props.rateAndSymbol.symbol;
  // var exercises = ['e1', 'e2', 'e3'];
  // var subtiteles = [
  //   { title: 'sub 1', hours: '2' },
  //   { title: 'sub 1', hours: '2' }
  // ];
  return (
    <div className="toolTip-container">
      <Item>
        <strong>Title : </strong>
        {title}
      </Item>
      <Item>
        <strong>Subject : </strong>
        {subject.name}
      </Item>
      {price && <Item>
        <strong>Price : </strong>
        {stringPrice}
      </Item>}
      {discount && discount.amount && (<Item>
        <strong>Discount : </strong>
        {discount.amount}
      </Item>)}
      <Item>
        <strong>Total Hours : </strong>
        {totalHours}
      </Item>
      <Item>
        <strong>Exercises </strong>
        {exercises &&
          exercises.map((e, index) => {
            return <div key={index}>{e}</div>;
          })}
      </Item>
      <Item>
        <strong>Subtitles </strong>
        {subtitles &&
          subtitles.map((s, index) => {
            return (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{s.title}</div>
                <div>{s.hours} Hour(s)</div>
              </div>
            );
          })}
      </Item>
    </div>
  );
};
function CustomizedTooltips(props) {
  var course = props.course;
  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <div className="toolTip">
              {courseDetails(
                props,
                course.title,
                course.price,
                course.discount,
                course.totalHours,
                course.subtitles,
                course.subject,
                course.exercises
              )}
            </div>
          </React.Fragment>
        }>
        <div>{props.toolContent}</div>
      </HtmlTooltip>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rateAndSymbol: state.rateAndSymbol,
    user: state.user
  };
};

export default connect(mapStateToProps)(CustomizedTooltips);
