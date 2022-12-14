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

import { deepOrange, deepPurple } from '@mui/material/colors';

class userReports extends Component {

    rows = [{
        id:'1',
        issue:'issue number one',
        issueType:'Payment',
        issueStatus:'pending'
    },
    {
        id:'2',
        issue:'issue number one',
        issueType:'Payment',
        issueStatus:'resolved'
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
          flex: 0.3,
          minWidth: 40,
          align:'center',
          headerAlign:'center',
          renderCell: rowData => {

             return (<div className= {rowData.row.issueStatus === 'pending'? 'issue-status-pending':'issue-status-resolved'} >{rowData.row.issueStatus}</div>)
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

             return (rowData.row.issueStatus === 'pending'&&<ChatIcon style={{cursor:'pointer'}} onClick={()=>{this.setState({chatModal:true})}}/>)
        }
        },
        
      
      ];

    state = {
        chatModal:false,
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
            var classNameType = mssg.user==='admin'? 'mssg admin-mssg':'mssg user-mssg';
            var classFloat = mssg.user==='admin'? 'mssg__content-admin':'mssg__content-user';
        
        
        var avatar = mssg.user === 'admin' ? (<Avatar sx={{ marginRight:'10px',bgcolor: deepOrange[500] }}>A</Avatar>):(<Avatar sx={{ marginRight:'10px', bgcolor: deepPurple[500] }}>OP</Avatar>);
            return ( 
                <div className={classNameType}><div className={classFloat}>{avatar}{mssg.mssg}</div></div>
            )
        })
    }
    render() {
        return (
            <div className='instructor-courses'>
                <div className='instructor-courses__title'>My Reports</div>
                <div className='instructor-courses__table'>
                    <DataGrid
                        rows={this.rows}
                        columns={this.columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        onRowClick = {()=>{this.setState({chatModal:true})}}
                       
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
        );
    }
}

export default userReports;