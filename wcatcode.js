#!/usr/bin/env node

const fs =require("fs");
// const { getSystemErrorMap } = require("util");
let arr=process.argv.slice(2);


const flags=[];
const files=[];
const yourchoice=[];

for(let i of arr){
    if(i[0]=="-"){
        flags.push(i);
    }else if (i[0]=="^"){
        yourchoice.push(i.slice(1));
   }else{
        files.push(i);
    }
}




if (flags[0]=='-a1i2'){ //append data of 2nd file in first only two files are needed 
    if(files.length>2){
       console.log("please enter two files only");
       return;
   }
    let data1=fs.readFileSync(files[0],"utf-8");
    let data2=fs.readFileSync(files[1],"utf-8");
    let appenddata=data1+"\n"+data2;
    console.log(appenddata);
}else if (flags[0]=="-s1a2"){  //swap 1 anad 2
    let data1=fs.readFileSync(files[0],"utf-8");
    let data2=fs.readFileSync(files[1],"utf-8");
    fs.writeFileSync(files[0],data2);
    fs.writeFileSync(files[1],data1);
}
for (let file of files){
let filedata=fs.readFileSync(file, "utf-8");
if (flags.length==0){
    printingstatement(filedata);
}
    for(let flag of flags){
        if(flag=='-rs'){  //remove spaces  .
            filedata=filedata.split(" ").join("");
            printingstatement(filedata);
        }else if (flag=='-rnl'){//remove nextline  .
            filedata=filedata.split("\r\n").join(""); 
            printingstatement(filedata);
        }else if(flag=='-rsc')  {  // remove special characters  .
           str="";
           for(let characters in filedata){
               if(filedata[characters]==' ' || filedata[characters]=='\n' || (filedata.charCodeAt(characters)>=97 && filedata.charCodeAt(characters)<=122)||(filedata.charCodeAt(characters)>=65 && filedata.charCodeAt(characters)<=90) ){
          str+=filedata[characters];
               }
           }
           filedata=str;
           printingstatement(filedata);
        }else if (flag=='-ryc'){   //remove charcter or string of your choice
           filedata=filedata.split(yourchoice).join("");
           printingstatement(filedata);
        }
        else if (flag=='-s')   {  //add counting before each line  . 
           filedata= addSequence(filedata);
           printingstatement(filedata);
        }else if (flag=='-asw'){    //add counting before written lines only  .

            filedata= addSequencebwl(filedata);
            printingstatement(filedata);
        
        }else if (flag=='-rel'){  //remove extra lines  .
            filedata=filedata.split("\n\r").join("");
            printingstatement(filedata);
        }else if (flag=='-releo'){ // remove extra lines except one line  .
            let arr=filedata.split("\n");
            let ans=[]; 
            for(let i=1;i<arr.length;i++){
                if(arr[i]=="" && arr[i-1]==""){
                    arr[i]=undefined;
                }
                if(arr[i]=="" && arr[i-1]==undefined){
                    arr[i]=undefined;
                }
            }
            for(let i=0;i<arr.length;i++){
                if(arr[i]!=undefined){
              ans.push(arr[i]);
                }
                         
            }
            for(let i=0;i<ans.length;i++){
               console.log(ans[i]);
                         
            }
        
       
        }
    }
   
}
function printingstatement(filedata){
    console.log(filedata);
}
// function releofun(filedata){
   
// }

function addSequence(filedata){
    str="";
    let count=1;
    let eachlineinarray=filedata.split("\n");
    for(let i of eachlineinarray){
        str+=count + " " + i +'\n';
        count++;
    }
return str;
}

function addSequencebwl(filedata){
    
    let count=1;
    let eachlineinarray=filedata.split("\r\n");
    for(let i in eachlineinarray){
       
        if(eachlineinarray[i] != ""){
            eachlineinarray[i]=count + " " + eachlineinarray[i] ;
        count++;
    }
}
return eachlineinarray.join("\n");
}