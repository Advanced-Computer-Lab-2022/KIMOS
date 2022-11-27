import React from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import {connect} from 'react-redux';
import {changeColor} from '../redux/actions/index';
import PaletteIcon from '@mui/icons-material/Palette';

function ColorRangePicker (props){

  const theme = useTheme();
  console.log(props);
  const [color, setColor] = useColor("hex", theme.palette.primary.main);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (color)=>{

    setColor(color);
    // theme.palette.primary.main = color.hex;

    props.changeColor(color.hex);


  }
  React.useEffect(()=>{

  },[])
  return (
    <div>
      <div>
          <PaletteIcon onClick={handleOpen} style={{color:'var(--primary-color)', margin:'10px', fontSize:'30px', cursor:'pointer'}}/>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:'flex', alignItems:'center', justifyContent:'center'}}
      >
          <ColorPicker width={456} height={228} color={color} onChange={handleChange} hideHSV dark />
      </Modal>
    </div>
  ) ;
};

const mapStateToProps = (state) =>{
   
  return {
      lightTheme: state.lightTheme,
      primaryColor: state.primaryColor
  };
}



export default connect(mapStateToProps,{changeColor})(ColorRangePicker)

