function removeColon( s)
{
    if (s.length == 4)
        s= s.replace(":", "");
     
    if (s.length == 5)
        s= s.replace(":", "");
     
    return parseInt(s);
}
 
// Main function which finds difference
export function diff( s1,  s2)
{
 
    // change string (eg. 2:21 --> 221, 00:23 --> 23)
     let time1 = removeColon(s1);
    
     let time2 = removeColon(s2);
     
 
    // difference between hours
     let hourDiff = parseInt(time2 / 100 - time1 / 100 - 1);
 
    // difference between minutes
     let minDiff = parseInt(time2 % 100 + (60 - time1 % 100));
 
    if (minDiff >= 60) {
        hourDiff++;
        minDiff = minDiff - 60;
    }
  
    // convert answer again in string with ':'
    let res = (hourDiff).toString() + ':' + (minDiff).toString();
    return res;
}

export function generateSeatStatus(allRedyBookedSeats){
    var seatStatus = [];
    var seat ={};
    for(var i=1;i<=30;i++){
        if(allRedyBookedSeats.includes(i)){
            seat["number"]=i;
            seat["available"]=false;
            seat["colour"]="black";
            seat["disable"]="none";
        }else{
            seat["number"]=i;
            seat["available"]=true;
            seat["colour"]="green";
            seat["disable"]="auto";
        }
        seatStatus.push(seat);
        seat={};
    }
    return seatStatus;

}