import React,{useState} from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'

const useStyles =  makeStyles((theme)=>({
	  table: {
		    minWidth: 80,
		  },
      root: {
			    width: '550px',
			    '& > * + *': {
			      marginTop: theme.spacing(66)
			    }
			  },
			  grid: {			   
			    display: "flex",
                    flexWrap: "flexWrap",
                    "& > *": {
      				margin: theme.spacing(-71,1,1,26),
      				width: theme.spacing(100),
      				height: theme.spacing('auto')
				    }
			  },
			  rootAppbar: {
				    flexGrow: 1,

				  },
				  menuButton: {
				    marginRight: theme.spacing(2),
				  },
				  title: {
				    flexGrow: 1,
				  },
				  rootFab: {
					  margin: 0,
					    top: 'auto',
					    left: 200,
					    bottom: 20,
					    right: 'auto',
					   
				  },
				  textFieldStyle :{
				  	'& > *' : {
				  		margin :  theme.spacing(1),
				  		width : '500px',
				  	},
				  },
				  buttonStyle :{
				  	'& > *' : {
				  		margin :  theme.spacing(1),
				   	},
				  },
				  filter : {
				  	display: "flex",
                    flexWrap: "flexWrap",
                    "& > *": {
      				margin: theme.spacing(1),
      				width: theme.spacing(24),
      				height: theme.spacing(70)
				    }
				  }
				 
				 
}));


function Dashboard() {
  const [obj,setObj] = useState({issues:[],  								  
                                 issueId : '', 
                                 issueTitle : '',
                                 assignee : '',
                                 priority : '',
                                 issueStatus : '',
                                 lastUpdatedTime : ''
                                  });
  const[issueId,setIssueId] = useState("");
  const[issueTitle,setIssueTitle] = useState("");
  const[assignee,setAssignee] = useState("");
  const[priority,setPriority] = useState("");
  const[errorMessage,setErrorMessage] = useState("");
  const[snackBarMessage,setSnackBarMessage] = useState("");
  const[isItemSelected,setIsItemSelected] = useState(false);
  const classes  = useStyles();
  const [open,setOpen] = React.useState(false);
  const [openUpdate,setOpenUpdate] = React.useState(false);
  const[openSnackBar,setOpenSnackBar] =  React.useState(false);
  const[closeSnackBar,setCloseSnackBar] =  React.useState(false);
  const[response,setResponse] = useState("");
  const[checked,setChecked] = useState({
  	All : false,
  	Low : false,
  	Medium : false,
  	High : false,
  	New : false,
  	InProgress : false,
  	Resolved : false,
  	Closed : false
  });
  const openDialog = () =>{
    	defaultValueLoading();
    	setOpen(true);    	
    }
    const closeDialog = () =>{
    	setOpen(false);
    	setIssueId('');
               setIssueTitle('');
               setAssignee('');
               setPriority('');
    }
    const openExistingDialog = () =>{
    	setOpenUpdate(true);
    }
    const closeExistingDialog = () =>{
    	setOpenUpdate(false);
    	setIssueId('');
               setIssueTitle('');
               setAssignee('');
               setPriority('');
    }

    const openSnackBars = (status,message) => {
    	setOpenSnackBar(status);
    	setSnackBarMessage(message);
    }

   const closeSnackBars = () => {
    	setOpenSnackBar(false);
    }    

  function filterLoading(event){   
   	var checkboxStatus = event.target.checked;
   	var targetCheckbox = event.target.value;   	    	
    targetCheckbox === "Low" || targetCheckbox === "Medium" || targetCheckbox === "High" ? 
    priorityFilterLoading(checkboxStatus,targetCheckbox) : statusFilterLoading(checkboxStatus,targetCheckbox);
 }  

    function priorityFilterLoading(checkboxStatus,targetCheckbox){      	
   	var ar=[];
   	if(targetCheckbox==="Low"){
   	checkboxStatus===true?setChecked({Low:true}) : setChecked({Low:false});	
   	}else if(targetCheckbox==="Medium"){
   	checkboxStatus===true?setChecked({Medium:true}) : setChecked({Medium:false});	
   	}else if(targetCheckbox==="High"){
   	checkboxStatus===true?setChecked({High:true}) : setChecked({High:false});	
   	}    
    if(checkboxStatus===true){
 		for(var i=0;i<response.length;i++){
    		if(response[i].priority === targetCheckbox){
    			    ar.push(response[i]);    			    
    		}
    	}     
    	setObj({issues : ar});  	
    //	ar.length==0 ? alert("No data") : setObj({issues : ar});
   }else if(checkboxStatus===false){
 		  for(var i=0;i<response.length;i++){    		
    			    ar.push(response[i]);    			        		
    	} 
    	setObj({issues : ar});  
        setChecked({All:true});
   }
 }  

 function statusFilterLoading(checkboxStatus,targetCheckbox){      	
   	var ar=[];
   	if(targetCheckbox==="New"){
   	checkboxStatus===true?setChecked({New:true}) : setChecked({New:false});	
   	}else if(targetCheckbox==="InProgress"){
   	checkboxStatus===true?setChecked({InProgress:true}) : setChecked({InProgress:false});	
   	}else if(targetCheckbox==="Resolved"){
   	checkboxStatus===true?setChecked({Resolved:true}) : setChecked({Resolved:false});	
   	}else if(targetCheckbox==="Closed"){
   	checkboxStatus===true?setChecked({Closed:true}) : setChecked({Closed:false});	
   	}        
    if(checkboxStatus===true){
 		for(var i=0;i<response.length;i++){
    		if(response[i].issueStatus === targetCheckbox){
    			    ar.push(response[i]);    			    
    		}
    	}   
    	setObj({issues : ar});
   }else if(checkboxStatus===false){
 		  for(var i=0;i<response.length;i++){    		
    			    ar.push(response[i]);    			        		
    	} 
    	setObj({issues : ar});  
    	setChecked({All:true});
   }
 }    

  function loadOperation(event){
            axios.get("http://192.168.42.115:8080/servlet-spring-mvc/ServletDbController",{ 
		   headers: {"Access-Control-Allow-Origin": "*",
		                "content-Type": "application/json"},
		   responseType: 'json'
			   })
	   .then(res =>{
		   console.log(res);
		   setResponse(res.data);
		   setObj({issues : res.data});
		   setChecked({all:true});
	   });
  }

  function insertOperation(event){	
  		  
			  var issues = {
					  issueId : issueId,
					  issueTitle :issueTitle,
					  assignee : assignee,
					  priority : priority,
					  issueStatus : 'New'
			  };			  
              if(issueId!=""){
			  axios.post("http://192.168.42.115:8080/servlet-spring-mvc/insert",issues,{				  			  
			   headers: {"Access-Control-Allow-Origin": "*",
				          "content-Type": "application/json"},
				  responseType: 'json'
			}).then(res => {
			   console.log(res);
			   if(res.data[0].status==true){
			   	openSnackBars(true,"Issue created successfully");
			   loadOperation();
			   defaultValueLoading();
			}else{
 					//alert(res.data[0].errorMessage);
 					this.setState({errorMessage : res.data[0].errorMessage});
 					alert(this.state.errorMessage);
	           }
		   });	
		   }else{
		   	openSnackBars(true,"Please Enter Issue Id");
                  //issueId =setErrorMessage('Enter Issue Id field');
		   }	   
}
   function updateOperation(event){			  
			  var issues = {
					  issueId : issueId,
					  issueTitle : issueTitle,
					  assignee : assignee,
					  priority : priority					  
			  };			  
			  if(issueId!=''){
			  axios.post("http://192.168.42.115:8080/servlet-spring-mvc/update",issues,{				  			  
			   headers: {"Access-Control-Allow-Origin": "*",
				          "content-Type": "application/json"},
				  responseType: 'json'
			}).then(res => {
			   console.log(res);
			    if(res.data==true){
			    	openSnackBars(true,"Issue updated successfully");
			             loadOperation();
			             closeExistingDialog();
			             defaultValueLoading();
			 }
		   });	
		   }else{
		   	openSnackBars(true,"Please Enter Issue Id");
		   }	   		   
		}	
	function deleteOperation(event){
              var issues = {
					  issueId : issueId					  
			  };			  

			  axios.post("http://192.168.42.115:8080/servlet-spring-mvc/delete",issues,{				  			  
			   headers: {"Access-Control-Allow-Origin": "*",
				          "content-Type": "application/json"},
				  responseType: 'json'
			}).then(res => {
				openSnackBars(true,"Issue deleted successfully");
			   console.log(res);
			   loadOperation();
			   defaultValueLoading();
            });	
	}

	function rowSelect(event){
		
		console.log(issueId);
        setIsItemSelected(true);
        //console.log(issueId1);  
		var issues = {
			issueId : issueId
		}
		if(issueId!=null){
		axios.post("http://192.168.42.115:8080/servlet-spring-mvc/fetchData",issues,{				  			  
			   headers: {"Access-Control-Allow-Origin": "*",
				          "content-Type": "application/json"},
				  responseType: 'json'
			}).then(res => {
			   console.log(res);
			//    if(res.data==true){
			//    this.componentDidMount();	
			// }else{
 		// 			//alert(res.data[0].errorMessage);
 		// 			this.setState({errorMessage : res.data[0].errorMessage});
 		// 			alert(this.state.errorMessage);
	  //          }
              openExistingDialog(true);
               setIssueId(res.data[0].issueId);
               setIssueTitle(res.data[0].issueTitle);
               setAssignee(res.data[0].assignee);
               setPriority(res.data[0].priority);

			   
		   });
		}else{
			alert("Please select data")
		}
	}	
    
    function defaultValueLoading(){
    	       setIssueId('');
               setIssueTitle('');
               setAssignee('');
               setPriority('');
			   closeDialog();
    }

    return ([
    	  <div id="id1" className={classes.rootAppbar}>
    	      <AppBar style={{ background: '##3f51b5' }} position="static">
    	        <Toolbar>
    	          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    	            <MenuIcon />
    	          </IconButton>
    	          <Typography variant="h6" className={classes.title}>
    	            Issue Portal
    	          </Typography>
    	          <Button color="inherit">Login</Button>
    	        </Toolbar>
    	      </AppBar>
    	    </div>,
    	    <div id="filter-priority" className={classes.filter}>
    		<Paper elevation={5} >		     		    
		    <ExpansionPanel>
		    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
		    PRIORITY
		    </ExpansionPanelSummary>
		    <ExpansionPanelDetails>	
		    <FormGroup>
		    <FormControlLabel 
		     control= {<Checkbox checked={checked.All} disabled={true}
		     			 onChange={filterLoading} color="primary" value="All"/>}
		     label="All"/>
		     <FormControlLabel 	     
		     control={<Checkbox checked={checked.Low}
		     			 onChange={filterLoading} color="primary" value="Low"/>}
		      label="Low"/>
		     <FormControlLabel 	     
		     control={<Checkbox 
		     			 checked={checked.Medium}
		     			 onChange={filterLoading}
		     			 color="primary"
		     			 value="Medium"/>}
		       label="Medium"/>
		     <FormControlLabel 	     
		     control={<Checkbox 
		     			 checked={checked.High}
		     			 onChange={filterLoading}
		     			 color="primary"
		     			 value="High"/>}
     			label="High"/>
     		</FormGroup>	
		    </ExpansionPanelDetails>
		    </ExpansionPanel>
    			     		    
		    <ExpansionPanel>
		    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
		    STATUS
		    </ExpansionPanelSummary>
		    <ExpansionPanelDetails>	
		    <FormGroup>
		    <FormControlLabel 
		     control= {<Checkbox checked={checked.New} 
		     			 onChange={filterLoading} color="primary" value="New"/>}
		     label="New"/>
		     <FormControlLabel 	     
		     control={<Checkbox checked={checked.InProgress}
		     			 onChange={filterLoading} color="primary" value="InProgress"/>}
		      label="In Progress"/>
		     <FormControlLabel 	     
		     control={<Checkbox 
		     			 checked={checked.Resolved}
		     			 onChange={filterLoading}
		     			 color="primary"
		     			 value="Resolved"/>}
		       label="Resolved"/>
		     <FormControlLabel 	     
		     control={<Checkbox 
		     			 checked={checked.Closed}
		     			 onChange={filterLoading}
		     			 color="primary"
		     			 value="Closed"/>}
     			label="Closed"/>
     		
     		</FormGroup>	
		    </ExpansionPanelDetails>
		    </ExpansionPanel>
		    
		     </Paper> 
    		</div>,
    	    <div id="id2" className={classes.grid}>
    		
		      <Paper elevation={5} >
    		<TableContainer component={Paper}>
    		<LinearProgress color="primary"/>
    	      <Table className={classes.table} aria-label="simple table">    	   
    	        <TableHead>
    	          <TableRow>
    	         	<TableCell align="center">Issue ID</TableCell>
    	         	<TableCell align="left">Issue Title</TableCell>
    	            <TableCell align="left">Assignee</TableCell>
    	            <TableCell align="left">Priority</TableCell>    	     
    	            <TableCell align="left">Status</TableCell>    	     
    	            <TableCell align="left">Last updated date/time</TableCell>    	     
    	          </TableRow>
    	        </TableHead>
    	        <TableBody>
    	        {    	              
    	               obj.issues.map(
    	            	(issueslist) =>
    	            	<TableRow key={issueslist.issueId} onClick={e => setIssueId(issueslist.issueId)}>
    	            	     <TableCell align="center">{issueslist.issueId}</TableCell>
    	            	     <TableCell>{issueslist.issueTitle}</TableCell>
    	            	     <TableCell>{issueslist.assignee}</TableCell>
    	            	     <TableCell>{issueslist.priority}</TableCell>
    	            	     <TableCell>{issueslist.issueStatus}</TableCell>
    	            	     <TableCell>{issueslist.lastUpdatedTime}</TableCell>
    	            	 </TableRow>
    	            	)  
    	            	}
    	            	
    	        
    	        </TableBody>
    	      </Table>
    	    </TableContainer>
    	    
    	    </Paper>

    	    </div>,
    	    
    	    <div>
    	     <Tooltip title="Add" aria-label="add" placement="top-start">
    	    <Fab  onClick={openDialog} style={{float: 'right'}} color="primary" aria-label="add">
            <AddIcon />
             </Fab>
             </Tooltip>
    	   </div>,
    	   
    	   <div id="id3">
    	   <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
           <DialogTitle id="form-dialog-title">Add new Issue</DialogTitle>           
    	   <Card className={classes.root} variant="outlined">
		      <CardContent>
			   <form className={classes.textFieldStyle} noValidate autoComplete="off">
		        <TextField  name="issueId" value={issueId} 
			    onChange={e => setIssueId(e.target.value)}
			                align="right" label="Issue Id" autoFocus/><br/>
		    	 
			   <TextField name="issueTitle" value={issueTitle}
			    onChange={e => setIssueTitle(e.target.value)}
		    			  label="Issue Title"/><br/>
		    	
			   <TextField name="assignee" value={assignee}
		    	onChange={e => setAssignee(e.target.value)}
		    	 label="Assignee"/><br/>
		         
			   <TextField name="priority" value={priority}
				    onChange={e => setPriority(e.target.value)}
			      label="Priotity"/><br/>
			      </form>
			      </CardContent>			 
			</Card>
			
			<DialogActions>
			   <Button onClick={closeDialog} variant="contained" color="primary">
			      Cancel
			      </Button>
			      <Button onClick={insertOperation} variant="contained" color="primary">
			      Save
			      </Button>
			</DialogActions>
			</Dialog>
 	   </div>,
        
        <div id="update-existing-issue-dialog">
    	   <Dialog open={openUpdate} onClose={closeExistingDialog} aria-labelledby="form-dialog-title">
           <DialogTitle id="form-dialog-title">update Existing Issue</DialogTitle>           
    	   <Card className={classes.root} variant="outlined">
		      <CardContent>
			   <form className={classes.textFieldStyle} noValidate autoComplete="off">
		        <TextField  name="issueId" value={issueId} 
			    onChange={e => setIssueId(e.target.value)}
			                align="right" label="Issue Id" InputProps={{readOnly:true,}}/><br/>
		    	 
			   <TextField name="issueTitle" value={issueTitle}
			    onChange={e => setIssueTitle(e.target.value)}
		    			  label="Issue Title" autoFocus/><br/>
		    	
			   <TextField name="assignee" value={assignee}
		    	onChange={e => setAssignee(e.target.value)}
		    	 label="Assignee"/><br/>
		         
			   <TextField name="priority" value={priority}
				    onChange={e => setPriority(e.target.value)}
			      label="Priotity"/><br/>
			      </form>
			      </CardContent>			 
			</Card>
			
			<DialogActions>
			   <Button onClick={closeExistingDialog} variant="contained" color="primary">
			      Cancel
			      </Button>
			      <Button onClick={updateOperation} variant="contained" color="primary">
			      Save
			      </Button>
			</DialogActions>
			</Dialog>
 	   </div>,
    	   <div id="5" className={classes.buttonStyle}>
    	          <Button onClick={loadOperation} variant="contained" color="primary">
			      Load
			      </Button>
			      <Button onClick={rowSelect} variant="contained" color="primary">
			      Update
			      </Button>
    	          <Button onClick={deleteOperation} variant="contained" color="primary">
			      Delete
			      </Button>
			      
    	   </div>,
    	   <div id="snack-bar">
    	    <Snackbar
                anchorOrigin={{
          		vertical: 'bottom',
          		horizontal: 'left',
        }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={closeSnackBars}
        message={snackBarMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackBars}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    	   </div>
    	   ]);
}
export default withStyles(useStyles)(Dashboard);