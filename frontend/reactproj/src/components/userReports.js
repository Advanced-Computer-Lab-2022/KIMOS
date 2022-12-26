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
import ChatIcon from '@mui/icons-material/Chat';
import Loading from './loadingPage';
import erenSmiling from '../assets/eren-smiliing.png';
import andrew from '../assets/andrewpp2.png';
import {connect} from 'react-redux';

import axios from 'axios';

import { deepOrange, deepPurple } from '@mui/material/colors';

class userReports extends Component {


    columns = [
        { 
          field: 'id', headerName: 'ID',
          flex: 0.05,
          minWidth: 40,
          align:'center',
          headerAlign:'center'
        },
        { field: 'title', headerName: 'Title',
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
          flex: 0.3,
          minWidth: 40,
          align:'center',
          headerAlign:'center',
          renderCell: rowData => {

             return (<div className= {rowData.row.status === 'resolved'? 'issue-status-resolved':'issue-status-pending'} >{rowData.row.status}</div>)
        }
        }
        ,
        {
          field: 'issueRes',
          headerName: 'Follow Up',
          flex: 0.3,
          minWidth: 40,
          align:'center',
          headerAlign:'center',
          renderCell: rowData => {

            return (rowData.row.status !== 'resolved'&& <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                    <ChatIcon style={{cursor:'pointer'}} onClick={()=>{this.setState({chatModal:true, currentReport:rowData.row})}}/>
                </div>)
        }
        },
        
      
      ];

    componentDidMount(){
        this.getReports();
    }
    state = {
        loading: true,
        reports:[],
        chatModal:false,
        currentReport:{messages:[]},
        textInput:'',
        mssgs:[
            {user:'admin', mssg:'We are checking your issue'},
            {user:'admin', mssg:'Whats wrong with your issue?'},
            {user:'user', mssg:'I want to refund a course'},
        ]
    }
    sendMssgAPI = async (message)=>{
        var data = {messages:[]}
        data.messages.push(message);
        const res = await axios.patch("http://localhost:5000/users/report?reportId="+this.state.currentReport["_id"],data)

    }
    getReports = async()=>{

        try{
            this.setState({loading: true});
            const res = await axios.get("http://localhost:5000/users/report");

            if(res.data.success){
                this.setState({reports: res.data.payload.reports, loading:false})
            }
            else{
                this.setState({loading:false})
            }

        }catch(e){

        }
    }

    handleMssgChange = (e)=>{
        this.setState({textInput:e.target.value})
    }
    keyPress = (e)=>{
        if(e.keyCode === 13){
            this.sendMssg();
         }
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
    }
    getMessages = ()=>{

        return this.state.currentReport.messages.map((mssg)=>{
            var classNameType = mssg.userType!=='administrator'?'mssg user-mssg':'mssg admin-mssg';
            var classFloat = mssg.userType!=='administrator'?'mssg__content-user':'mssg__content-admin';
        
        
        var avatar = mssg.userType !== "administrator" ? (<Avatar sx={{ width: 30, height: 30 , marginRight:'10px',bgcolor: deepOrange[500] }} src={erenSmiling}/>):(<Avatar sx={{width: 30, height: 30, marginRight:'10px', bgcolor: deepPurple[500] }} src={andrew}/>);
            return ( 
                <div className={classNameType}><div className={classFloat}>{avatar}{mssg.message}</div></div>
            )
        })
    }
    render() {
        return (
            <div className='instructor-courses'>
                {this.state.loading && <Loading />}
                <div className='instructor-courses__title'>My Reports</div>
                <div className='instructor-courses__table'>
                    <DataGrid
                        rows={this.state.reports}
                        columns={this.columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        getRowId={(row) => row['_id']}
                        disableColumnSelector
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
                <div className='chat-container__title'>Issue Number One</div>
                <div className='chat-container__chat'>
                    {this.getMessages()}
                </div>
                <div className='chat-container__bottom'>
                    <div className='chat-container__bottom__text'>
                        <TextField  onKeyDown={this.keyPress} value= {this.state.textInput} onChange={this.handleMssgChange} style={{width:'100%'}} label="Message" variant="outlined" />
                    </div>
                    <PrimaryBtn function={this.sendMssg} btnText="Send"/>
                </div>


                
            
            </div>
        </Modal>
        </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
      user: state.user
    };
  };
  
export default connect(mapStateToProps)(userReports);