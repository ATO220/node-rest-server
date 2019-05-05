


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
    urlDB = 'mongodb://RESTuser:restuser123@ds135704.mlab.com:35704/rest-server-s9';
    
}

process.env.URL_DB = urlDB;