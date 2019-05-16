


//======================================= 
//  Port
//=======================================

process.env.PORT = process.env.PORT || 3007; 


//======================================= 
//  Environment
//=======================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================================= 
//  Token expiration
//=======================================
// 60 segs
// 60 mins
// 24 hours
// 30 days
process.env.TOKEN_EXPIRATION = '48h';

//======================================= 
//  Token SEED 
//=======================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

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

//=================================================
//   Google ClientID
//=================================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '302673693764-ucfka2mmsciqsomkb0i4lt86kgaa9dmh.apps.googleusercontent.com';