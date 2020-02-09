
//Convert character in the string into its integer value
function convertCharToValue(c){
    switch(c){
        case "I":
            return 1;
        case "V":
            return 5;
        case "X":
            return 10;
        case "L":
            return 50;
        case "C":
            return 100;
        case "D":
            return 500;
        case "M":
            return 1000;
        default:
            return -1;
    }
}
//Check if the input string is a valid Roman numerals
//The rules for checking validation is based on this site http://sierra.nmsu.edu/morandi/coursematerials/RomanNumerals.html?fbclid=IwAR2lkP-_rfWOwmpdNjy3V2LmDqpfNpAcoWMNpKbThkzIF9v79r5aLfKiphk
function validate(str){
    let isValid = true;
    let strArr = str.split("");
    for(var i=0; i<strArr.length; i++){
        if(convertCharToValue(strArr[i]) === -1){
            //check if the string contains non Roman numeral character
            isValid = false;
        }
        else if(strArr[i] === "L" || strArr[i] === "D" || strArr[i] === "V"){
            //check if the "L", "D", "V" character is repeated 
            if((i+1) < strArr.length && strArr[i] === strArr[i+1]){
                isValid = false;
            }
        }
        else {
            if((i + 3) < strArr.length){
                 //check if the "I", "X", "C", "M" character is repeated more than 3 times next to each other 
                if(strArr[i] === strArr[i+1] && strArr[i+1] === strArr[i+2] && strArr[i+2] === strArr[i+3]){
                    isValid = false
                }
            }
        }
    }
    return isValid;
}
//Main function: Convert the Roman numerals into integer value
function convertRomanNumeralToInteger(str){
    if(validate(str.toUpperCase())){
        //if the input string is valid
        let strArr = str.split("");
        var result = 0;
        for(var i=0; i<strArr.length; i++){
            //get the value of the roman character at the current index 
            var c1= convertCharToValue(strArr[i]);
            if(i +1 < strArr.length){
                //get the value of the roman character at the next index 
                var c2 = convertCharToValue(strArr[i+1]);
                if(c1 < c2){
                    //if the value of the next index is greater than the value of the current index, 
                    //the result = (the current result) + (the value of the next index) - (the value of current index) 
                    // i = i +1, so that they wont continue to calculate the value of next index
                    result = result + c2 - c1;
                    i++;
                }
                else{
                     //if the value of the next index is smaller or equal to the value of the current index, 
                    //the result = (the current result) + (the value of current index) 
                    result = result + c1;
                }
            }
            else {
                //if the index is at the end of the loop, the result = the current result + value of current index.
                result = result + c1; 
            }
        }
        return result;
    }
    else{
        //if the input string is not valid
        return "Please input a valid Roman numerals"
    }

}

//Testing
console.log(convertRomanNumeralToInteger("MMMMCMXCIX")) // Output : "Please input a valid Roman numerals"
console.log(convertRomanNumeralToInteger("MMMCMXCIX")) //Output : 3999