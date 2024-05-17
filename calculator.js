const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

const checkNumbers = (n1,n2,req,res) => {
  var flag = false
  try{
    if(isNaN(n1)) {
      logger.error("n1 is not correct");
      throw new Error("n1 is not correct");
    }
    if(isNaN(n2)) {
        logger.error("n2 is not correct");
        throw new Error("n2 is not correct");
    }
    if (n1 === NaN || n2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
    }
    flag = true; 
    logger.info(n1+' and '+n2+' are valid numbers ');
    return flag;
    } catch(error) {
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
    return flag
    }
}

const add= (n1,n2) => {
    return n1+n2;
}

const sub= (n1,n2) => {
  return n1-n2;
}

const mul= (n1,n2) => {
  return n1*n2;
}

const div= (n1,n2) => {
  return n1/n2;
}

app.get("/add", (req,res)=>{
    try{
      const n1= parseFloat(req.query.n1); 
      const n2= parseFloat(req.query.n2);
      logger.info('Parameters '+n1+' and '+n2+' received for addition');
      const flag = checkNumbers(n1,n2,req,res);
      if(flag == true)
      {
        const result = add(n1,n2);
        res.status(200).json({statuscocde:200, data: result }); 
      }
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});
app.get("/sub", (req,res)=>{
    try{
     const n1= parseFloat(req.query.n1); 
     const n2= parseFloat(req.query.n2);
     logger.info('Parameters '+n1+' and '+n2+' received for substraction');
     const flag = checkNumbers(n1,n2,req,res);
     if(flag == true)
     {
      const result = sub(n1,n2);
      res.status(200).json({statuscocde:200, data: result }); 
     }
    } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});
app.get("/mul", (req,res)=>{
  try{
    const n1= parseFloat(req.query.n1); 
    const n2= parseFloat(req.query.n2);
    logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
    const flag = checkNumbers(n1,n2,req,res);
    if(flag == true)
    {
      const result = mul(n1,n2);
      res.status(200).json({statuscocde:200, data: result }); 
    }
  } catch(error) { 
     console.error(error)
     res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});
app.get("/div", (req,res)=>{
  try{
   const n1= parseFloat(req.query.n1); 
   const n2= parseFloat(req.query.n2);
   logger.info('Parameters '+n1+' and '+n2+' received for division');
   const flag = checkNumbers(n1,n2,req,res);
   if(flag == true)
   {
     const result = div(n1,n2);
     res.status(200).json({statuscocde:200, data: result }); 
   }
  } catch(error) { 
     console.error(error)
     res.status(500).json({statuscocde:500, msg: error.toString() })
  }
});
const port=3100;
app.listen(port,()=> {
    console.log("This project is listening on port " +port);
});