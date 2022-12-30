import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { closeAlert } from '../redux/actions/index';
import { connect } from 'react-redux'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertFunc(props) {



  return (
    <Snackbar open={props.alert.shown} autoHideDuration={6000} onClose={props.closeAlert}>
        <Alert onClose={props.closeAlert} severity={props.alert.severity} sx={{ width: '100%' }}>
            {props.alert.message}
        </Alert>
    </Snackbar>

  );
}



const mapStateToProps = (state) => {
    return {
    alert: state.alert
    };
  };
  
export default connect(mapStateToProps, {closeAlert:closeAlert})(AlertFunc);
  