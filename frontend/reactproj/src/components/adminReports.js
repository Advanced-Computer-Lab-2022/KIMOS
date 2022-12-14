import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Rating from '../components/rating';
import ShowCourse from './showCourse/showCourse';
import Drawer from '@mui/material/Drawer';
import PrimaryBtn from '../components/buttons/primaryBtn';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ChatIcon from '@mui/icons-material/Chat';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';


class adminReports extends Component {

    rows = [{
        id:'1',
        issue:'issue number one',
        issueType:'Payment',
        issueStatus:'pending',
        seen:0
    },
    {
        id:'2',
        issue:'issue number one',
        issueType:'Payment',
        issueStatus:'resolved',
        seen:1
    }]
    columns = [
        { 
          field: 'id', headerName: 'ID',
          flex: 0.05,
          minWidth: 40,
          align:'center',
          headerAlign:'center'
        },
        { field: 'issue', headerName: 'Issue',
          flex: 1,
          minWidth: 40,
          align:'center',
          headerAlign:'center',
      
          },
        {
          field: 'issueType',
          headerName: 'Issue Type',
          flex: 1,
          minWidth: 40,
          align:'center',
          headerAlign:'center'
        },
        {
          field: 'issueStatus',
          headerName: 'Issue Status',
          flex: 0.35,
          minWidth: 40,
          align:'center',
          headerAlign:'center',
          renderCell: rowData => {

             return (      <Stack direction="row" spacing={1} alignItems="center">
                                <Switch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                <p>Resolved</p>
                            </Stack>)
        }
        }
        ,
        {
          field: 'followUp',
          headerName: 'Follow Up',
          flex: 0.2,
          minWidth: 40,
          align:'center',
          headerAlign:'center',
          renderCell: rowData => {

             return (rowData.row.issueStatus === 'pending'&& <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                                <ChatIcon style={{cursor:'pointer'}} onClick={()=>{this.setState({chatModal:true})}}/>
                                </div>)
        }
        },
          {
            field: 'refund',
            headerName: 'Refund',
            flex: 0.15,
            minWidth: 40,
            align:'center',
            headerAlign:'center',
            renderCell: rowData => {
  
               return (rowData.row.issueStatus === 'pending'? <AttachMoneyIcon style={{cursor:'pointer', color:'green'}} onClick={()=>{this.setState({refundModal:true})}}/> : (<div></div>))
          }
          },
          {
            field: 'seen',
            headerName: 'Seen?',
            flex: 0.3,
            minWidth: 40,
            align:'center',
            headerAlign:'center',
            renderCell: rowData => {
  
               return (rowData.row.issueStatus === 'pending'? <VisibilityIcon/> : <VisibilityOffIcon />)
          }
          },
          
        
      
      ];

    state = {
        chatModal:false,
        refundModal:false,
        showReports:true,
        textInput:'',
        mssgs:[
            {user:'admin', mssg:'We are checking your issue'},
            {user:'admin', mssg:'Whats wrong with your issue?'},
            {user:'user', mssg:'I want to refund a course'},
        ]
    }
    handleMssgChange = (e)=>{
        this.setState({textInput:e.target.value})
    }
    sendMssg = ()=>{
        var nMssgs = [...this.state.mssgs];
        nMssgs.push({user:'user',mssg:this.state.textInput})
        this.setState({mssgs:nMssgs}, ()=>{
            this.setState({textInput:''})
        })
    }
    getMessages = ()=>{

        return this.state.mssgs.map((mssg)=>{
            var classNameType = mssg.user==='admin'?'mssg user-mssg':'mssg admin-mssg';
            var classFloat = mssg.user==='admin'?'mssg__content-user':'mssg__content-admin';
        
        
        var avatar = mssg.user === 'admin' ? (<Avatar sx={{ marginRight:'10px',bgcolor: deepOrange[500] }}>A</Avatar>):(<Avatar sx={{ marginRight:'10px', bgcolor: deepPurple[500] }}>OP</Avatar>);
            return ( 
                <div className={classNameType}><div className={classFloat}>{avatar}{mssg.mssg}</div></div>
            )
        })
    }
    getRefundContent = ()=>{
        return (<div style={{borderRadius:'10px',background:'var(--cool-grey)' ,height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div style={{marginRight:'2vw' }}>
                        <div>Refund Amount</div>
                    </div>
                    <div>
                        <TextField sx={{background:'white'}} label="Refund Amount" type="number"/>
                    </div>            
                </div>)
    }
    render() {
        return (
            <div  style={{display:'flex', flexDirection:'column'}}>
                {this.state.showReports &&(
                <div  style={{height:'100%', display:'flex', flexDirection:'column'}}><div className='instructor-courses__title' style={{margin:'10px'}}>Reported Problems</div>
                <div className='instructor-courses__table'>
                    <DataGrid
                        rows={this.rows}
                        columns={this.columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}

                       
                    />
                </div>
                <Modal
                    open={this.state.chatModal}
                    onClose={()=>{this.setState({chatModal:false})}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className='chat-container'>
                        <div className='chat-container__title'>Issue Number One</div>
                        <div className='chat-container__chat'>
                            {this.getMessages()}
                        </div>
                        <div className='chat-container__bottom'>
                            <div className='chat-container__bottom__text'>
                                <TextField value= {this.state.textInput} onChange={this.handleMssgChange} style={{width:'100%'}} label="Message" variant="outlined" />
                            </div>
                            <PrimaryBtn function={this.sendMssg} btnText="Send"/>
                        </div>


                        
                    
                    </div>
                </Modal> 
                <Modal
                    open={this.state.refundModal}
                    onClose={()=>{this.setState({refundModal:false})}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className='chat-container' style={{height:'40%'}}>
                        <div className='chat-container__title'>Refund Issue Number One</div>
                        <div className='chat-container__chat'>
                            {this.getRefundContent()}
                        </div>
                        <div className='chat-container__bottom'>
                            <div></div>
                            <PrimaryBtn function={this.sendMssg} btnText="Send Refund"/>
                        </div>


                        
                    
                    </div>
                </Modal>   
                </div>
                
                )}

                {!this.state.showReports &&(
                    <div  style={{height:'100%', display:'flex', flexDirection:'column'}}><div className='instructor-courses__title' style={{margin:'10px'}}>Refunds</div>
                    <div className='instructor-courses__table'>
                        <DataGrid
                            rows={this.rows}
                            columns={this.columns}
                            pageSize={20}
                            rowsPerPageOptions={[20]}
    
                           
                        />
                    </div>
                    <Modal
                        open={this.state.chatModal}
                        onClose={()=>{this.setState({chatModal:false})}}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className='chat-container'>
                            <div className='chat-container__title'>Issue Number One</div>
                            <div className='chat-container__chat'>
                                {this.getMessages()}
                            </div>
                            <div className='chat-container__bottom'>
                                <div className='chat-container__bottom__text'>
                                    <TextField value= {this.state.textInput} onChange={this.handleMssgChange} style={{width:'100%'}} label="Message" variant="outlined" />
                                </div>
                                <PrimaryBtn function={this.sendMssg} btnText="Send"/>
                            </div>
    
    
                            
                        
                        </div>
                    </Modal>   
                    </div>
                    
                    )}



        <BottomNavigation
            showLabels
            value={this.state.showReports? 0 : 1}
            style={{ background: 'var(--cool-grey)', borderTop: '0.5px solid grey' }}
            onChange={(event, newValue) => {
                this.setState({showReports: (newValue ===0)});
            }}>
            <BottomNavigationAction label="Reports" icon={<ReportGmailerrorredIcon />} />
            <BottomNavigationAction label="Refunds" icon={<AttachMoneyIcon />} />
        </BottomNavigation>
        </div>
        );
    }
}

export default adminReports;