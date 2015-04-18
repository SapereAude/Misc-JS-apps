
 
 // Fetch key elements from document with (document.querySelectorAll)
 var calcKeys = document.querySelectorAll('#calculator span');
 var operators = ['+','-','*','/'];
 var decimalAdded = false;
 
 // Subscripe all calculator keys to onclick events
 for(var i = 0; i < calcKeys.length; i++){
        //Asign onclick event to every button on calculator.
	calcKeys[i].onclick = function(e){
		
		/*Get input and output values*/
                //Output to the user.
		var input = document.querySelector('.calc_display');
                
		var inputValue = input.innerHTML;
                //get input values from user.
		var buttonValue = this.innerHTML;
                
                //Check if previous value is 'Error'. 
                //If so, clear it.
		if(input.innerHTML === 'Error'){
                    input.innerHTML = '';
                    inputValue = '';
                }
                
		//clear display
		if(buttonValue === 'C'){
			input.innerHTML = '';
                        decimalAdded = false;
		}
		
		//calculate values
		else if(buttonValue === '='){
			var equation = inputValue;
                        
                        //if equation has proper value
                        if(equation){
                            var total = eval(equation);
                        
                            //Check if 'total' is not infinite
                            if(isFinite(total)){
                                input.innerHTML = total;
                            }
                            else{
                                input.innerHTML = 'Error';
                            }
                            decimalAdded = false;
                    }
		}
		
		//Check if current character is an operator
		else if(~operators.indexOf(buttonValue)){
                    
                    //get the last char of 
                    var lastChar = inputValue[inputValue.length -1];

                    // Check if display is NOT empty AND the preceding input is NOT a member of 'operators' array.
                    // this prevents the user to add a operator as first input. ('~' bitwise operator)
                    if(inputValue !== '' && !~operators.indexOf(lastChar)){
                        input.innerHTML += buttonValue;
                    }
                    // Allows minus to be added if display is empty.
                    else if(inputValue === '' && buttonValue === '-'){
                        input.innerHTML += buttonValue;
                    }
                    //if last char was an operator AND and it's not at first position, then replace the older operator with the newer one
                    else if(~operators.indexOf(lastChar) && inputValue.length > 1){
                        input.innerHTML = inputValue.replace(/.$/, buttonValue);
                        // /.$/ => regex (. = match any char except linebreaks, $ = match end of string)
                    }
                    decimalAdded = false;
		}
                else if(buttonValue === '.'){
                    if(!decimalAdded){
                        input.innerHTML += buttonValue;
                        decimalAdded = true;
                    }
                }
                // Append numbers.
                else{
			input.innerHTML += buttonValue;
                        decimalAdded = false;
                }
	};
 }