


//======================================= 
//  Port
//=======================================

process.env.PORT = process.env.PORT || 3007; 


//======================================= 
//  Environment
//=======================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================================= 
//  DataBase
//======================================= 
let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.URI_DB;
    
}

process.env.URL_DB = urlDB;