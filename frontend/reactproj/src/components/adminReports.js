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
import axios from 'axios';
import erenSmiling from '../assets/eren-smiliing.png';
import andrew from '../assets/andrewpp2.png';
import {connect} from 'react-redux';
import Loading from './loadingPage';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';


class adminReports extends Component {
    getReports = async ()=>{
        this.setState({loading: true})
        const res = await axios.get("http://localhost:5000/users/report");
        console.log(res.data.payload.reports)
        this.setState({reports:res.data.payload.reports, loading:false});
    }

    getRefunds = async ()=>{
        this.setState({loading: true})
        const res = await axios.get("http://localhost:5000/users/requests?requestType=refund");
        if(res.data.payload.reports)
            this.setState({refunds:res.data.payload.reports, loading:false});
        else console.log("no data")
    }
    componentDidMount(){

        this.getReports();this.getRefunds();
    }
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

        { field: 'title', headerName: 'Issue',
          flex: 1,
          minWidth: 40,
          align:'center',
          headerAlign:'center',
      
          },
        {
          field: 'type',
          headerName: 'Issue Type',
          flex: 1,
          minWidth: 40,
          align:'center',
          headerAlign:'center'
        },
        {
          field: 'status',
          headerName: 'Issue Status',
          flex: 0.35,
          minWidth: 40,
          align:'center',
          headerAlign:'center',
          renderCell: rowData => {
             var status = rowData.row.status === 'resolved' ? 'Resolved':'Pending' 
             return (      <Stack direction="row" spacing={1} alignItems="center">
                                <Switch onChange={(e)=>{this.handleSwitchChange(e, rowData.row['_id'])}} defaultChecked={rowData.row.status === 'resolved'} inputProps={{ 'aria-label': 'ant design' }} />
                                <p>{status}</p>
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

             return (true&& <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                                <ChatIcon style={{cursor:'pointer'}} onClick={()=>{this.setState({chatModal:true, currentReport:rowData.row})}}/>
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
  
               return (rowData.row.status === 'pending'? <AttachMoneyIcon style={{cursor:'pointer', color:'green'}} onClick={()=>{this.setState({refundModal:true})}}/> : (<div></div>))
          }
          },
          {
            field: 'seen',
            headerName: 'Seen?',
            flex: 0.3,
            minWidth: 40,
            align:'center',
            valueFormatter: ({ value }) => {return 0},
            headerAlign:'center',
            renderCell: rowData => {
  
               return (rowData.row.status !== 'unseen'? <VisibilityIcon /> : <VisibilityOffIcon />)
          }
          },
          
        
      
      ];

    refundcolumns = [

        { field: 'title', headerName: 'Course Name',
          flex: 1,
          minWidth: 40,
          align:'center',
          headerAlign:'center',
      
          },
          { 
            field: 'id', headerName: 'Course ID',
            renderCell: (rowData,index)=> {
              return index
            },
            flex: 1,
            minWidth: 40,
            hide:true,
            align:'center',
            headerAlign:'center'
          },
          { 
            field: 'courseId', headerName: 'Course ID',
            flex: 1,
            minWidth: 40,
            align:'center',
            headerAlign:'center'
          },
          
        { field: 'username', headerName: 'User Name',
        flex: 1,
        minWidth: 40,
        align:'center',
        headerAlign:'center',
      
        },
        {
          field: 'userId',
          headerName: 'User Id',
          type: 'string',
          flex: 1,
          minWidth: 40,
          align:'center',
          headerAlign:'center'
        },
        {
          field: 'actions',
          headerName: 'Accept/Reject',
          renderCell: (rowData)=>{
            return <div>{this.CorrectActionBtn(rowData)} { this.rejectActionBtn(rowData)}</div>
          },
          flex: 1,
          minWidth: 40,
          align:'center',
          headerAlign:'center'
        },
      ];
    CorrectActionBtn = (rowData)=>{
        return (
          <IconButton
            size="small"
            sx ={{background:'#ACE1AF',color:'#006A4E'}}
            onClick={()=>this.sendRes('accepted', rowData.row['_id'])}
            >
              <CheckIcon />
        </IconButton>
        )
      }
    rejectActionBtn = (rowData)=>{
        return (
          <IconButton
            size="small"
            sx ={{background:'#F08080',color:'#CC0000'}}
            onClick={()=>this.sendRes('rejected', rowData.row['_id'])}
      
            >
              <ClearIcon />
        </IconButton>
        )
      }
    sendRes = async (status, id)=>{
        const res = await axios.post("http://localhost:5000/users/accessStatus?requestId="+id,{newState:status})
        console.log(res);
      }
    state = {
        loading: true,
        chatModal:false,
        refundModal:false,
        showReports:true,
        textInput:'',
        mssgs:[
            {user:'admin', mssg:'We are checking your issue'},
            {user:'admin', mssg:'Whats wrong with your issue?'},
            {user:'user', mssg:'I want to refund a course'},
        ],
        reports:[],
        refunds:[],
        currentReport:{messages:[]}
    }
    handleMssgChange = (e)=>{
        this.setState({textInput:e.target.value})
    }
    keyPress = (e)=>{
        if(e.keyCode === 13){
            this.sendMssg();
         }
    }

    updateReportStatus = (id, status)=>{
        var currReport = {};
        this.state.reports.forEach((report)=>{
            if(report["_id"] === id){
                currReport = report; 
            }
        })
        currReport.status = status;
    }
    handleSwitchChange = async (e, id) =>{
        this.setState({loading:true});
        var status = e.target.checked ? "resolved":"pending";
        const res = await axios.put("http://localhost:5000/users/report?reportId="+id,{
                newStatus:status
        })
        this.getReports();

    }
    sendMssg = ()=>{
        var nMssgs = [...this.state.currentReport.messages];

        var newMssg = {userType:this.props.user.userType, message:this.state.textInput};
        nMssgs.push(newMssg);
        var currRep = {...this.state.currentReport};
        currRep.messages = nMssgs;
        this.setState({currentReport:currRep, textInput:''}, ()=>{
            this.sendMssgAPI(newMssg);
        })

        
        // nMssgs.push({user:'user',mssg:this.state.textInput})
        // this.setState({mssgs:nMssgs}, ()=>{
        //     this.setState({textInput:''})
        // })
    }

    sendMssgAPI = async (message)=>{
        var data = {messages:[]}
        data.messages.push(message);
        const res = await axios.patch("http://localhost:5000/users/report?reportId="+this.state.currentReport["_id"],data)

    }
    getMessages = ()=>{

        return this.state.currentReport.messages.map((mssg)=>{
            var classNameType = mssg.userType==='administrator'?'mssg user-mssg':'mssg admin-mssg';
            var classFloat = mssg.userType==='administrator'?'mssg__content-user':'mssg__content-admin';
        
        
        var avatar = mssg.userType === "administrator" ? (<Avatar sx={{ width: 30, height: 30 , marginRight:'10px',bgcolor: deepOrange[500] }} src={erenSmiling}/>):(<Avatar sx={{width: 30, height: 30, marginRight:'10px', bgcolor: deepPurple[500] }} src={andrew}/>);
            return ( 
                <div className={classNameType}><div className={classFloat}>{avatar}{mssg.message}</div></div>
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
                {this.state.loading && <Loading />}
                {this.state.showReports &&(
                <div  style={{height:'100%', display:'flex', flexDirection:'column'}}><div className='instructor-courses__title' style={{margin:'10px'}}>Reported Problems</div>
                <div className='instructor-courses__table'>
                    <DataGrid
                        rows={this.state.reports}
                        columns={this.columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        getRowId={(row) => row['_id']}
                        disableSelectionOnClick
                    />
                </div>
                <Modal
                    open={this.state.chatModal}
                    onClose={()=>{this.setState({chatModal:false})}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className='chat-container'>
                        <div className='chat-container__title' style={{color:"var(--primary-color)"}}>{this.state.currentReport.title}</div>
                        <div className='chat-container__chat'>
                            {this.getMessages()}
                        </div>
                        {this.state.currentReport.status !=='resolved' && <div className='chat-container__bottom'>
                            <div className='chat-container__bottom__text'>
                                <TextField onKeyDown={this.keyPress}  value= {this.state.textInput} onChange={this.handleMssgChange} style={{width:'100%'}} label="Message" variant="outlined" />
                            </div>
                            <PrimaryBtn function={this.sendMssg} btnText="Send"/>
                        </div>}


                        
                    
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
                            rows={this.state.refunds}
                            columns={this.refundcolumns}
                            pageSize={20}
                            rowsPerPageOptions={[20]}
    
                           
                        />
                    </div>
                
                    </div>
                    
                    )}



        <BottomNavigation
            showLabels
            value={this.state.showReports? 0 : 1}
            style={{ background: 'var(--cool-grey)', borderTop: '0.5px solid grey' }}
            onChange={(event, newValue) => {

                this.setState({showReports: (newValue === 0)});
            }}>
            <BottomNavigationAction label="Reports" icon={<ReportGmailerrorredIcon />} />
            <BottomNavigationAction label="Refunds" icon={<AttachMoneyIcon />} />
        </BottomNavigation>
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.user
    };
  };
  
export default connect(mapStateToProps)(adminReports);