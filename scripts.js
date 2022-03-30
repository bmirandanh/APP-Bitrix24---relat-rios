// Declare the variables required
let departmentMap = new Map();
var project_check_id  = 0;
var projects_length = 0;
var en = 0;
let departmentNameMap = new Map();
let nameMap = new Map();
let crmMap = new Map();
let companyMap = new Map();
let elapsedMap = new Map();
let projectMap = new Map();
var task_name = Array();
var task_id = Array();
var group_id = Array();
var tasked_id = 0;
var elapsed_id = 0;
var tasks_length = 0;
var elapsed_items_length = 0;
let out= [];
var it;
var crm_size = 0;
var crm_id = 0;
var project_check = 0;
var elapsed_check = 0;
var department_check = 0;
var company_check = 0;
var starting_date="";
var check_lengths = 0;
var total_user = 0;
var fetched_user_id = new Array();
var fetched_department_id = new Array();
var closing_date = "";
var total_company = 0;
var company_id = 0;
var c_id;
var c_name;
var temp_department_id = 0;
var temp_department_name = "";
var project_length = 0;
var project_check = 0;
var groupset = new Set();
var department_length = 0;
var deals_id = 0;
var deals_length = 0;
let dealsMap = new Map();
var contact_length = 0;
let contactMap = new Map();
var contact_id = 0;
var delimiter = '';
var task_set = new Set();
var task_filter = new Array();
var all_task = new Array();
var crm_filter= new Array();
var crm_count = 0;
var index = document.getElementById("Departamento").selectedIndex;
var index2 = document.getElementById("Colaboradores").selectedIndex + 7;
var auxfil = "";

function empon(){
	document.getElementById("emp").style.display = 'block';
	document.getElementById("col").style.display = 'none';
	var auxfil = "emp";
}
function colon(){
	document.getElementById("emp").style.display = 'none';
	document.getElementById("col").style.display = 'block';
	var auxfil = "col";
}


// Make a call to REST when JS SDK is loaded
BX24.init(function(){
	//This code is executed when application is started
	var default_date = new Date();
	var year= default_date.getFullYear();
	var month = default_date.getMonth();
	var date= default_date.getDate();
	var index = document.getElementById("Departamento").selectedIndex;
	var index2 = document.getElementById("Colaboradores").selectedIndex + 7;
	
	if(month == 0){
		 var dt = (year-1)+'-12-01T01:01:01+03:00';
		 var dt2 = (year-1)+'-12-31T01:01:01+03:00';
	}else {
		if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10){
			var dt = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-01T01:01:01+03:00';
			var dt2 = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-31T01:01:01+03:00';
			document.getElementById("start_date").value = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-01';
				document.getElementById("end_date").value = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-31';
		} else if(month==2){
			if( year%4 == 0){
				var dt = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-01T01:01:01+03:00';
				var dt2 = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-31T01:01:01+03:00';
				document.getElementById("start_date").value = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-01';
				document.getElementById("end_date").value = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-29';
			}else{
				var dt = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-01T01:01:01+03:00';
				var dt2 = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-31T01:01:01+03:00';
				document.getElementById("start_date").value = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-01';
				document.getElementById("end_date").value = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-28';
			}
		} else {
			var dt = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-01T01:01:01+03:00';
				var dt2 = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-31T01:01:01+03:00';
				document.getElementById("start_date").value = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-01';
				document.getElementById("end_date").value = (year)+'-'+month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-30';
		}
	}
	
	//console.log('B24 SDK is ready!', BX24.isAdmin());
});

//check if the input date is correct
function  checkdate() {
	//call the function to reset the variables
	reset_variables();
	
	//check if valid delimiter is given
	if(document.getElementById("delimiter").value.length > 1 || document.getElementById("delimiter").value.length == 0){
		document.getElementById("warning").innerHTML = "Coloque um Delimitador compatível";
		return;
	}else{
		delimiter = document.getElementById("delimiter").value;
	}

	//Check if no date is given or start date is more than end date
	if(document.getElementById("start_date").value != "" && document.getElementById("end_date").value != "" && document.getElementById("start_date").value < document.getElementById("end_date").value){
	
		// initialize dates according to the bitrix conventions
		starting_date =document.getElementById("start_date").value + "T01:01:01+03:00";
		closing_date =document.getElementById("end_date").value + "T23:59:59+03:00";
		
		//variable to store today's date
		var current_date = new Date(); 
		if( document.getElementById("end_date").value >= current_date.toISOString().substring(0,10) ){
			document.getElementById("warning").innerHTML = "A Data final não pode ser o dia atual ou futuro";
		} else if( document.getElementById("start_date").value > current_date.toISOString().substring(0,10)){
			
			document.getElementById("warning").innerHTML = "Por favor coloque uma data válida";
		
		}else{
			//Initialize the variable which checks the fiels to be fetched
			check_lengths=0;
			
			// Make log and ongoing process visisble
			document.getElementById("output").style.visibility = "visible";

			//Disable the buttons while fetching the data
			document.getElementById("start").disabled = true;
			document.getElementById("end_date").disabled = true;
			document.getElementById("start_date").disabled = true;
			document.getElementById("delimiter").disabled = true;
			
			document.getElementById("warning").innerHTML = "Por favor, Não atulize a página";
			
			//if the date is correct find the length of the data to be fetched
			getlength();
		}
	}else{
		document.getElementById("warning").innerHTML = "Por favor, insira uma data válida";
	}
}

//To find the length of the data to be fetched
function getlength(){
	
	//Find the number of elapsed items
	BX24.callMethod(
		'task.elapseditem.getlist',
		[ { 'ID': 'asc'},
		{ '>=CREATED_DATE': starting_date , '<=CREATED_DATE': closing_date}],
		function(result){
			  if( result.error() ){
				  document.getElementById('connection').innerHTML += result.error() + "<br>";
			  } else {
				  //store the total number of elapsed items
				  elapsed_items_length = result.total();
				  check_lengths++;
			//	  document.getElementById('connection').innerHTML += result.total() + " Elapsed Items to be fetched<br>";
				  //Check if all 5 lengths are fetched
				  if(check_lengths == 9){
					getdata();
				  }
			  }  
	});
	
	//find number of departments
	BX24.callMethod('department.get', {}, function(result) {  
		  if( result.error() ){
			  document.getElementById('connection').innerHTML += result.error() + "<br>";
		  } else {
			  //store the total number of elapsed items
			  department_length = result.total();
			  check_lengths++;
			//  document.getElementById('connection').innerHTML += result.total() + " Departments to be fetched<br>";
			  //Check if all 5 lengths are fetched
			  if(check_lengths == 9){
				getdata();
			  }
		  } 
	}); 
				
	
	//Find number of users
	BX24.callMethod('user.get', [{ 'ID': 'ASC'}], function(user_data) {  
		
		if(user_data.error()){
			document.getElementById('connection').innerHTML += user_data.error()+"<br>";
		} else{
			total_user = user_data.total();
			//document.getElementById('connection').innerHTML += user_data.total() + " Users to be fetched<br>";
			check_lengths++;
			//Check if all 5 lengths are fetched
			if(check_lengths == 9){
				getdata();
			}
		}
	});

	//Find the number of tasks
	BX24.callMethod(
		'task.item.list',
		[ { 'ID': 'asc'},
		{ '>=CREATED_DATE': starting_date , '<=CREATED_DATE': closing_date }],
		function(result){
			  if( result.error() ){
				  document.getElementById('connection').innerHTML += result.error() + "<br>";
			  } else{
				  //store the total number of tasks
				  tasks_length = result.total();
				  check_lengths++;
				  
				  //Check if all lengths are fetched
				  if(check_lengths == 9){
					getdata();
				  }
			  }
	});
	
	//find the number of projects
	BX24.callMethod('sonet_group.get',{ }, function(proj){
		  if( proj.error() ){
			  document.getElementById('connection').innerHTML += proj.error() + "<br>";
		  } else{
			  //store the total number of projects
			  projects_length = proj.total();
			  check_lengths++;
			//  document.getElementById('connection').innerHTML += proj.total() + " Projects to be fetched<br>";
			  //Check if all lengths are fetched
			  if(check_lengths == 9){
				getdata();
			  }
		  }
	});
	
	
	//Find number of companies
	BX24.callMethod('crm.company.list',{ }, function(result)
	{	
		if( result.error() ) {
			document.getElementById('connection').innerHTML += result.error() + "<br>";
		}else {
			total_company = result.total();
		//	document.getElementById('connection').innerHTML += total_company + " Companies To be fetched<br>";
			check_lengths++;
			//check if all lengths are fetched
			if( check_lengths == 9 ){
				getdata();
			}
		}
	});

	//find number 0f deals
	BX24.callMethod(
	"crm.deal.list", 
	{ 
		order: { "ID": "ASC" },
		filter: {  }
	}, function(result){
		if(result.error())
			document.getElementById('connection').innerHTML += result.error() +"<br>";
		else
		{	//document.getElementById('connection').innerHTML += result.total() +" Deals to be fetched<br>";
			deals_length = result.total();	
			check_lengths++;
			//check if all length are fetched
			if(check_lengths == 9){
				getdata();
			}
		}
	});

	
	//find number of contacts
	BX24.callMethod(
		"crm.contact.list", 
		{}, 
		function(result) 
		{
			if(result.error()){
			//	document.getElementById('connection').innerHTML += result.error() +"<br>";
			}else
			{
				contact_length = result.total();			
			//	document.getElementById('connection').innerHTML += result.total() +" Contacts to be fetched<br>";
				check_lengths++;
				//check if all length are fetched
				if(check_lengths == 9){
					getdata();
				}
			}
		}
	);
	
	//Find the number of CRM activities
	BX24.callMethod(
		'crm.activity.list',
		{	filter:
			{ '>=CREATED': starting_date , '<=CREATED': closing_date , '>ASSOCIATED_ENTITY_ID': 0	} 
		},
		function(result){
			  if( result.error() ) {
				  document.getElementById('connection').innerHTML += result.error() + "<br>";
			  } else{
				  //store the number of CRM activities
				  crm_size = result.total();
				  check_lengths++;
				 // document.getElementById('connection').innerHTML += result.total() + " CRM Activities to be fetched<br>";
				  //Check if all lengths are fetched
				  if(check_lengths == 9){
					getdata();
				  }
			  }
	 });
}


//Empty function as callback for recursively calling three functions to fetch data in batches
function callbacker(){
}

//Function to make calls to fetch the data
async function getdata(){
	//initialise check_lengths with 0 again
	check_lengths = 0;
	
	document.getElementById('connection').innerHTML +="<br>";
	//prepare the filter variable for department.get
	var insert_value = 0;
	for(insert_value = 1; insert_value <= 30 ; insert_value++){
		fetched_department_id.push(insert_value);
	}
	
	//fetch departments
	departmentiteration( 0, department_length/50, callbacker() );
	
	//fetch projects
	projectiteration( 0, projects_length/50, callbacker() );
	
	//fetch the elapsed items
	elapsediteration( 0, elapsed_items_length/50 , callbacker());
	
}


//function to iterate through departments
function departmentiteration( index, length, cb17 ){
	//Call the function that gets the data from API
	fordepartment( function(){
	  if( index == length  ) {
	   cb17(); return;
	  }
	  departmentiteration( index+1, length, cb17 );
	});
}
 
//function to fetch departments
async function fordepartment( cb18 ){
	BX24.callMethod('department.get', {"ID": fetched_department_id }, function(result) {  
		  if( result.error() ){
			  document.getElementById('connection').innerHTML += result.error() + "<br>";
		  } else {
			  //store the total number of elapsed items
			  var it = 0 ;
			  for(it = 0;it < result.data().length ; it++){
				  //form a map for department id department name
				  departmentNameMap.set(result.data()[it].ID , result.data()[it].NAME);
				  document.getElementById('chk').innerHTML =" Departamentos encontrados :"+ departmentNameMap.get(result.data()[it].ID)+ "<br>";
			
			  }
			  //document.getElementById('connection').innerHTML += "department "+ result.total() +"are fetched<br>";
				var temp_last_fetch_id = fetched_department_id[fetched_department_id.length - 1] ;
				var new_array_value = 0;
				fetched_department_id.length = 0;
				//update the filter variable of fordepartment()
				for( new_array_value = temp_last_fetch_id+1;new_array_value< temp_last_fetch_id+30;new_array_value++){
					fetched_department_id.push(new_array_value);
					//document.getElementById('connection').innerHTML +="<br>fetchuserid:" + fetched_department_id[new_array_value - temp_last_fetch_id - 1];
				}  
			  if( departmentNameMap.size == department_length){
				//  document.getElementById('connection').innerHTML += "=> Departments fetched. Total " + departmentNameMap.size + "<br>";
				  en++;
				  //ready the filter variable of users
				  var insert_value = 0;
				  for(insert_value = 1; insert_value <= 50 ; insert_value++){
					  fetched_user_id.push(insert_value);
				  }
				  //call the function to fetch users
				  useriteration( 0, total_user/50 , callbacker());
				  if(en == 7){
					document.getElementById("chk").innerHTML = " Prepando Finalização do arquivo";
					// function to start the csv download
					setTimeout( function(){
						document.getElementById('chk').innerHTML = "Arquivo Pronto";
						download_csv_file();
					},7000);
				  }
				  return;
			  } 
			  
			  cb18();
		  } 
	});
};

//function to iterate through projects
function projectiteration( index, length, cb11 ){
	//Call the function that gets the data from API
	forproject( function(){
	  if( index == length  ) {
	   cb11(); return;
	  }
	  projectiteration( index+1, length, cb11 );
	});
}
 
 
//function to fetch data
async function forproject( cb12){ 
	BX24.callMethod('sonet_group.get',{'ORDER': {'ID': 'ASC'},'FILTER': {'>ID': project_check_id} }, function(proj){
		var it = 0;
		for( it =0 ;it < proj.data().length ; it++){
			//make a map for project id project name
			projectMap.set(proj.data()[it].ID, proj.data()[it].NAME);	
			document.getElementById("chk").innerHTML = " Projetos Encontrados :" + proj.data()[it].NAME;
			//update the filter variable
			project_check_id = proj.data()[it].ID;
		}
		//check if all projects are fetched
		if( projectMap.size == projects_length){
			//update the variable which checks when to end the process
			en++;
		//	document.getElementById('connection').innerHTML += "=> Projects fetched. Total : " + projectMap.size + "<br>";
					
			//check if all fields are fetched
			if(en == 7){
				document.getElementById('chk').innerHTML = "Final dos processos";
				
				//function to download the csv file
				setTimeout( function(){
					download_csv_file();
				},7000);
			}
			return;
		}
		if(proj.error()){
			document.getElementById('connection').innerHTML += proj.error() + "<br>";  
		}
		cb12();
	});
}; 


//function to fetch tasks in batches it will run infinitely and return statement in fortask() can end the loop
function taskiteration( index, length, cb1 ){
	//Call the function that gets the data from API
	fortask( function(){
	  if( index == length  ) {
	   cb1(); return;
	  }
	  taskiteration( index+1, length, cb1 );
	});
}

//Fetch task data
async function fortask( cb2){ 
	//Call the API
	BX24.callMethod(
		'task.item.list',
		[ { 'ID': 'asc'},
		{ 'ID': task_filter }],
		function(result){
			 var it;
			 for(it = 0; it < result.data().length; it++){
				  // store the task name, id and project id . 
				  task_name.push(result.data()[it].TITLE) ;
				  task_id.push(result.data()[it].ID) ;
				  group_id.push(result.data()[it].GROUP_ID);
				  
				  document.getElementById("chk").innerHTML = " Tarefas encontradas :" + task_id.length;
				  
				  //update the filter parameter tasked_id
				  tasked_id =  result.data()[it].ID ;
			 }
			 task_filter.length = 0;
			 //prepare filter variable for tasks
			 for(filtering = task_id.length ; filtering < task_id.length + 50 ; filtering++){
				task_filter.push(all_task[filtering]); 
			 }

			 //check if all tasks are fetched
			 if(task_id.length >= tasks_length){
				// update the variable which checks when to end the process
				en++;
				//Check if no tasks are present
				if(tasks_length == 0) {
					//end the process if no tasks are present
					en = 7;
				}
				//fetch Companies 
				company_iterator( 0, total_company/50 , callbacker() );
				
			//	document.getElementById('connection').innerHTML += "=> Tasks fetched. Total : " + task_id.length + "<br>";
				
				//check if all fields are fetched
				if(en == 7){
					document.getElementById("chk").innerHTML = " Relatório iniciando finalização";
					// function to start the csv download
					setTimeout( function(){
						document.getElementById('chk').innerHTML = "Processos Finalizados";
						download_csv_file();
					},7000);
				  }
				
				//End the loop
				return;
			}
			 
			console.info(result.data());
			console.log(result);
			//print any errors
			if( result.error()){
				 document.getElementById('connection').innerHTML += result.error() + "<br>";
			}
			
			//Call the callback function
			cb2();
		});
};
 
// iterating function which runs forelapsed() in an infinite loop. a return statement in forelapsed() will end the loop
function elapsediteration( index, length, cb ){
	forelapsed( function(){
	  if( index == length  ) {
	   cb(); return;
	  }
	  elapsediteration( index+1, length, cb );
	});
}

// function to fetch all the elapsed items
async function forelapsed( cb1){ 

  // api call to fetch the data
  BX24.callMethod(
		'task.elapseditem.getlist',
		[ { 'ID': 'asc'},
		{ '>=CREATED_DATE': starting_date, '>ID': elapsed_id , '<=CREATED_DATE': closing_date}],
		function(result){
			 var it;
			 for(it =0 ; it < result.data().length ; it++){
				document.getElementById('chk').innerHTML = "Itens encontrados: " + elapsedMap.size;
				//make variable to fetch time
				var t = result.data()[it].SECONDS;
				//convert time into the format hh:mm:ss
				var elapsed_duration = (Math.floor(t/3600)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + (Math.floor((t%3600)/60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + ((t%3600)%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
			    
			    //store the elapsed items in a Map
			    elapsedMap.set(elapsedMap.size + 1, {task_id: result.data()[it].TASK_ID, comment:  result.data()[it].COMMENT_TEXT, duration: elapsed_duration, date: result.data()[it].CREATED_DATE, user_id: result.data()[it].USER_ID});
				//update the filter parameter
				elapsed_id = result.data()[it].ID;
				// push task id in a set
				task_set.add(result.data()[it].TASK_ID);
			  }
			  //Check if all Elapsed items are fetched
			  if(elapsedMap.size == elapsed_items_length){
				  // update the variable which checkes to end the process
				  en++;
				  
			//	  document.getElementById('connection').innerHTML += "=> Elapsed items fetched. Total : "+ elapsedMap.size +"<br>";
				  
				  //Check if all fields are fetched
				  if(en == 7){
					document.getElementById("chk").innerHTML = " Iniciando Finalização";
					//function to download the csv file
					setTimeout( function(){
						document.getElementById('chk').innerHTML = "Processos Terminados";
						download_csv_file();
					},7000);
				  }
				  //store task id in an array
				  all_task = Array.from(task_set);
				  //prepare filter variable for tasks
				  for(filtering = 0 ; filtering < 50 ; filtering++){
					task_filter.push(all_task[filtering]); 
				  }
				  
				  
				  tasks_length = task_set.size;
				  //document.getElementById('connection').innerHTML += tasks_length + " Tasks to be fetched<br>";
				  //fetch the tasks
				  taskiteration( 0, tasks_length/50 , callbacker());
				  //end the loop
				  return;
			  }
			  console.info(result.data());
			  console.log(result);
			  
			  if(result.error()){
				document.getElementById('connection').innerHTML += result.error() + "<br>"; 
			  }			  
			  cb1();
		});
 };
 
 
 //function to fetch tasks in batches which runs foruser() in infinite loop. a return statement in foruser() will end the loop
function useriteration( index, length, cb5 ){
	//Call the function that gets the data from API
	foruser( function(){
	  if( index == length  ) {
	   cb5(); return;
	  }
	  useriteration( index+1, length, cb5 );
	});
}

// function to fetch users data
async function foruser( cb4){ 
    
    //Call the API function
	BX24.callMethod('user.get', {"ID": fetched_user_id }, function(user_data) {  
		var user_it = 0;
		//document.getElementById('connection').innerHTML +="First filter value: " + fetched_user_id[0] + "<br>";
		// iterate through all the fetched data
		for(user_it =0; user_it < user_data.data().length ; user_it++){
			
			document.getElementById('chk').innerHTML = "Usuários Encontrados  : " + nameMap.size;
			//document.getElementById('connection').innerHTML += "Fetchin user with id : " + user_data.data()[user_it].ID + ":" + user_data.data()[user_it].NAME+ ":"+ user_data.data()[user_it].UF_DEPARTMENT[0] +"<br>";
			//store user id and name in nameMap
			
			if( user_data.data()[user_it].UF_DEPARTMENT[0] != null){
				temp_department_id = (user_data.data()[user_it].UF_DEPARTMENT[0]).toString();
				temp_department_name = departmentNameMap.get(temp_department_id);
				departmentMap.set(user_data.data()[user_it].ID, temp_department_name );
				//make a map for user id and ddepartment name
				nameMap.set(user_data.data()[user_it].ID, user_data.data()[user_it].NAME + " " + user_data.data()[user_it].LAST_NAME );
			}
			
		}
		//document.getElementById('connection').innerHTML +="data fetched in one loop : " + user_data.data().length +"<br>";
		var temp_last_fetch_id = fetched_user_id[fetched_user_id.length - 1] ;
		var new_array_value = 0;
		fetched_user_id.length = 0;
		for( new_array_value = temp_last_fetch_id+1;new_array_value<= temp_last_fetch_id+50;new_array_value++){
			fetched_user_id.push(new_array_value);
			//document.getElementById('connection').innerHTML +="fetchuserid:" + fetched_user_id[new_array_value - temp_last_fetch_id - 1];
		}  
		//check if all users are stored in nameMap
		if(nameMap.size == total_user ) {
			//update the variable which checks when to end the process
			en++;
		//	document.getElementById('connection').innerHTML += "=> Users fetched. Total : "+ nameMap.size +"<br>";
			//Check if all the fields are fetched
			if(en == 7){
				document.getElementById("chk").innerHTML = " Finalizando Processos";
				//call the function to download csv
				setTimeout( function(){
					document.getElementById('chk').innerHTML = "Processos Finalizados";
					download_csv_file();
				},7000);
			}
			//end the loop
			return;
		}
		
		if(user_data.error()){
			document.getElementById('connection').innerHTML += user_data.error() + "<br>";
		}
		cb4();
	});
};

//Function to run the for_company() in infinite loop . a return statement in for_company() will end the loop
function company_iterator( index, length, cb9 ){
	for_company( function(){
	  if( index == length  ) {
	   cb9(); return;
	  }
	  company_iterator( index+1, length, cb9 );
	});
}


//Function to fetch the company names of all companies present in the account 
async function for_company(cb10){
	
	//Api call to fetch all the companies
	BX24.callMethod('crm.company.list',{ filter: { ">ID": company_id} }, function(result)
	{	//iterate through all the fetched data
		for(it = 0; it < result.data().length; it++){
			
			document.getElementById('chk').innerHTML = "Empresas encontradas : " + result.data()[it].TITLE;
			//store company id and company name in companyMap
			companyMap.set(result.data()[it].ID, result.data()[it].TITLE );
			//update the filter variable company_id
			company_id = result.data()[it].ID;
		}
		if(companyMap.size == total_company){
		//	document.getElementById('connection').innerHTML += "=> Companies fetched. Total : " + companyMap.size + "<br>";
			//call the iterator to fetch deals
			deals_iterator( 0 , deals_length/50 , callbacker());
			//crm_iterator( 0, crm_size/50 + 1, callbacker());
			//update the variable which checks when to end the process
			en++;
			//Check if all fields are fetched
			if(en == 7){
				document.getElementById("chk").innerHTML = " Processos em fase de Finalização";
				//function to download the csv file
				setTimeout( function(){
					document.getElementById('chk').innerHTML = "Processos terminados";
					download_csv_file();
				},7000);
			}
			//end the loop
			return;
		}
		if(result.error()){
			document.getElementById('connection').innerHTML += result.error() + "<br>";
		}
		cb10();
	});	
	
}

//Function to run the for_crm_activity() in infinite loop . a return statement in for_crm_activity() will end the loop
function crm_iterator( index, length, cb3 ){
	for_crm_activity( function(){
	  if( index == length  ) {
	   callbacker(); return;
	  }
	  crm_iterator( index+1, length, cb3 );
	});
}

//Function to fetch the data of CRM
async function for_crm_activity( cb3){ 
	
	//Make the API call
	BX24.callMethod('crm.activity.list', 
	{
		order:{ "ID": "ASC" },
		filter:
		{  'ASSOCIATED_ENTITY_ID': crm_filter	}
	}, function(result)
	{
		var i=0;
		//loop through all the fetched fields
		for(i=0;i<result.data().length;i++){
			
			document.getElementById('chk').innerHTML = "Atividades de CRM encontradas : " + crmMap.size;
			//if owner is a deal
			if(result.data()[i].OWNER_TYPE_ID ==2){ 
				//fetch contact id from dealMap of corresponding deal
				var contact_from_deal = dealsMap.get(result.data()[i].OWNER_ID);
				//from contact id fetch company id from contactMap
				var company_id_from_contact = contactMap.get(contact_from_deal);
				//fetch company name using company map
				var company_name_from_id = companyMap.get(company_id_from_contact);
				//make a map for task id and company name
				crmMap.set(result.data()[i].ASSOCIATED_ENTITY_ID, company_name_from_id);
				
				
			} else if(result.data()[i].OWNER_TYPE_ID ==3){
				//if the owner is a contact
				
				//from ownerId id fetch company id from contactMap
				var company_id_from_contact = contactMap.get(result.data()[i].OWNER_ID);
				//fetch company name using company map
				var company_name_from_id = companyMap.get(company_id_from_contact);
				//make a map for task id and company name
				crmMap.set(result.data()[i].ASSOCIATED_ENTITY_ID, company_name_from_id);
			}else{
				// if owner is a company
				//temporarily store the company id
				c_id = result.data()[i].OWNER_ID;
				
				//store the corresponding company name in temporary variable
				c_name = companyMap.get(c_id) ;

				//store the task id, company name in crmMap
				crmMap.set(result.data()[i].ASSOCIATED_ENTITY_ID, c_name);
				
			}
			//update the filter variable crm_id
			crm_id = result.data()[i].ID;
		}

		//check if all the data are fetched
		if( crm_count >= task_id.length){
		//if( crmMap.size == crm_size){
			  //update the variable which check to end the process
			  en++;
					  
		//	  document.getElementById('connection').innerHTML += "=> CRM Activities fetched. Total :  "+ crmMap.size +"<br>";
			  //CHECK IF ALL FIELDS ARE FETCHED
			  if(en == 7){
				document.getElementById('chk').innerHTML = "Processos em fase de finalização";
				//function to download csv file
				setTimeout( function(){
					document.getElementById('chk').innerHTML = "processos finalizados";
					download_csv_file();
				},7000);
			  }
			  //end the loop
			  return;
		}
		crm_filter.length = 0;
		for(i=crm_count;i< crm_count + 50 && i < task_id.length; i++){
			crm_filter.push(task_id[i]);
		}
		crm_count += 50;

		if( result.error()){
			document.getElementById('connection').innerHTML += result.error() +"<br>";
		}
		cb3();
	});
};

function deals_iterator( index, length, cb19 ){
	for_deals( function(){
	  if( index == length  ) {
	   cb19(); return;
	  }
	  deals_iterator( index+1, length, cb19 );
	});
}

async function for_deals(cb20){
	//api call to fetch deals
	BX24.callMethod(
		"crm.deal.list", 
		{ 
			order: { "ID": "ASC" },
			filter: { ">ID": deals_id  }
		}, 
		function(result) 
		{
			if(result.error()){
				document.getElementById('connection').innerHTML += result.error() +"<br>";
			}else
			{	var it = 0;
				for( it = 0; it < result.data().length ; it++){
					document.getElementById('chk').innerHTML = "Deals Encontrados" + dealsMap.size;
					//create a map for deal id and contact id
					dealsMap.set( result.data()[it].ID , result.data()[it].CONTACT_ID);
					//update filter variable
					deals_id = result.data()[it].ID;
				}
				//if all deals are fetched
				if( dealsMap.size == deals_length){
					//call the contact iterator
					contact_iterator( 0, contact_length, callbacker() );
					
			//		document.getElementById('connection').innerHTML += "=> Deals fetched . Total " +dealsMap.size + "<br>";
					//end the recursion
					return;
				}						
			}
		
		cb20();
		}
	);
};


//iterator for contacts 
function contact_iterator( index, length, cb21 ){
	for_contact( function(){
	  if( index == length  ) {
	   cb21(); return;
	  }
	  contact_iterator( index+1, length, cb21 );
	});
}

//function to fetch contact data/
async function for_contact(cb22){
	//api call
	BX24.callMethod(
		"crm.contact.list", 
		{ 
			order: { "ID": "ASC" },
			filter: { ">ID": contact_id }
		}, 
		function(result) 
		{
			if(result.error()){
				document.getElementById('connection').innerHTML += result.error() +"<br>";
			}else
			{	var it = 0;
				//document.getElementById('connection').innerHTML += "Filter contact : " + contact_id + " . Total fetch this time = " +result.total()+":" + result.data()[0].ID +"<br>";
				for(it = 0; it<result.data().length ; it++){
					document.getElementById('chk').innerHTML = " Contatos encontrados : " + contactMap.size;
					//create a map for contact id and company id
					contactMap.set( result.data()[it].ID , result.data()[it].COMPANY_ID);
					//update filter variable
					contact_id = result.data()[it].ID;
				}
				
				//if all contacts are fetched
				//if( contactMap.size == contact_length){
				if( result.total() == result.data().length){
					//ready variable for crm filter
					for(i=crm_count;i< crm_count + 50; i++){
						crm_filter.push(task_id[i]);
					}
					crm_count = 50;
					//call crm iterator
					crm_iterator( 0, task_id.length/50 , callbacker());
			//		document.getElementById('connection').innerHTML +="=> Contacts fetched. Total : " + contactMap.size + "<br>";
					//end the recursion
					return;
				}						
			}
			cb22();
		});
};

//Function to download the report
function download_csv_file() {
	//Call the function to store the data in a variable to be sent in the report
	storedata();
	
	document.getElementById('connection').innerHTML += "CSV gerado <br> ";
	//define the heading for each row of the data
	var csv = 'Task Name' + delimiter + 'Task ID' + delimiter + 'Project' + delimiter + 'CRM Name' + delimiter + 'Elapsed Time-Date' + delimiter + 'Created By' + delimiter + 'User Department' + delimiter + 'Elapsed Time-Duration \n';
	
	//merge the data with CSV
	out.forEach(function(row) {
			csv += row.join(delimiter);
			csv += "\n";
	});

	var BOM = "\uFEFF"; 
	csv = BOM + csv;
	
	//create CSV data  
	var hiddenElement = document.createElement('a');
	hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
	hiddenElement.target = '_blank';
	var today_date = new Date();
	
	//provide the name for the CSV file to be downloaded
	hiddenElement.download = 'TaskReport-' + today_date.toISOString().substring(0,19) +'.csv';
	hiddenElement.click();
	
	//Enable all the buttons
	document.getElementById("start").disabled = false;
	document.getElementById("start_date").disabled = false;
	document.getElementById("end_date").disabled = false;
	document.getElementById("delimiter").disabled = false;
	
	/*
	*document.getElementById("output").style.visibility = "hidden";
	*Refresh the page
	*setTimeout( function() { window.location.reload(true); }, 5000);
	*/
}

//Function to store data in a variable
function storedata(){
    document.getElementById('connection').innerHTML += "<br>Arquivo pronto para ser transferido <br>";
	var index = document.getElementById("Departamento").selectedIndex;
	var index2 = document.getElementById("Colaboradores").selectedIndex + 7;
   //Loop through all the tasks
   for(it = 0; it < task_id.length; it++){
		var it1= 0;
		//variable to check if elapsed items are there or not
		var elapsed_items_present = false;
		
		// loop to check if a task has elapsed items or not
		for(it1 = 0; it1 < elapsedMap.size; it1++){
			//Check if task has elapsed items
	
			if(task_id[it] == elapsedMap.get(it1+1).task_id){
				if(document.getElementById("col").style.display === 'block'){
					if(nameMap.get(elapsedMap.get(it1+1).user_id) == document.getElementsByTagName("option")[index2].value){
					out.push([task_name[it] || "null", task_id[it] || "null", projectMap.get(group_id[it]) || "null", crmMap.get(task_id[it]) || "null", elapsedMap.get(it1+1).date || "null", nameMap.get(elapsedMap.get(it1+1).user_id) || "null", departmentMap.get(elapsedMap.get(it1+1).user_id) || "null", elapsedMap.get(it1+1).duration] || "null");
					elapsed_items_present = true;
					}
				}else if (document.getElementsByTagName("option")[index].value != "Todos"){
					if(departmentMap.get(elapsedMap.get(it1+1).user_id) == document.getElementsByTagName("option")[index].value){
					out.push([task_name[it] || "null", task_id[it] || "null", projectMap.get(group_id[it]) || "null", crmMap.get(task_id[it]) || "null", elapsedMap.get(it1+1).date || "null", nameMap.get(elapsedMap.get(it1+1).user_id) || "null", departmentMap.get(elapsedMap.get(it1+1).user_id) || "null", elapsedMap.get(it1+1).duration] || "null");
					elapsed_items_present = true;
					}

				}	
			}
		} 
			//if there are no elapsed items
			if( !elapsed_items_present ){
				out.push(["", "","","", "", "", "", ""]);
			}		
	}
}

//function to reset the variables
function reset_variables(){
	//clear the global variables
	departmentMap.clear();
	en = 0;
	departmentNameMap.clear();
	nameMap.clear();
	crmMap.clear();
	companyMap.clear();
	elapsedMap.clear();
	projectMap.clear();
	task_name.length = 0;
	task_id.length = 0;
	group_id.length = 0;
	tasked_id = 0;
	elapsed_id = 0;
	tasks_length = 0;
	elapsed_items_length = 0;
	out.length = 0;
	it = 0;
	crm_size = 0;
	crm_id = 0;
	project_check = 0;
	elapsed_check = 0;
	department_check = 0;
	company_check = 0;
	starting_date="";
	check_lengths = 0;
	total_user = 0;
	fetched_user_id.length = 0;
	closing_date = "";
	total_company = 0;
	company_id = 0;
	c_id = 0;
	c_name = "";
	project_length = 0;
	project_check = 0;
	groupset.clear();
	project_check_id  = 0;
    projects_length = 0;
	department_length = 0;
	fetched_department_id.length = 0;
	deals_id = 0;
	deals_length = 0;
	dealsMap.clear();
	contact_length = 0;
	contactMap.clear();
	contact_id = 0;
	task_set.clear();
	task_filter.length = 0;
	all_task.length = 0;
	crm_filter.length = 0;
	crm_count = 0;
	//clear the logs and ongoing process
	document.getElementById('connection').innerHTML = "";
	document.getElementById('warning').innerHTML = "";
	document.getElementById('chk').innerHTML = "";
}