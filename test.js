let data = [
	[
		{ emp_id: 'A001', sc_id: 1, amount: 1000, percent: 10 },
		{ emp_id: 'A001', sc_id: 2, amount: 500, percent: 20 },
		{ emp_id: 'A001', sc_id: 3, amount: 500, percent: 10 }
	],
	[
		{ emp_id: 'A002', sc_id: 1, amount: 1500, percent: 10 },
		{ emp_id: 'A002', sc_id: 2, amount: 250.69, percent: 20 },
		{ emp_id: 'A002', sc_id: 3, amount: 250, percent: 10 }
	]
];
let compData = [
	{ sc_id: 1, percent: null, data_type: 'a', percent_on: 0, min_limit: null, max_limit: null },
	{ sc_id: 2, percent: 10, data_type: 'a', percent_on: 0, min_limit: 100, max_limit: 101 },
	{ sc_id: 3, percent: 20, data_type: 'p', percent_on: 50, min_limit: 100, max_limit: 101 }
];
function getObj(id) {
    let  temp = {};
	compData.forEach((element) => {
		if (element.sc_id == id) {
            temp = element;
		}
    });
    return temp;
}
let e = ""
data.forEach((element) => {
	let gross = 0;
	let basic = 0;
	let rest = 0;
	element.forEach((indEmp) => {
        let compData = getObj(indEmp.sc_id)
        //console.log("Dslahdsjkladj",compData);
        console.log(indEmp.sg_id,indEmp.sg_id == 1);
        
		if (indEmp.sc_id == 1) {
            gross = indEmp.amount;
            if(compData.min_limit != null && compData.max_limit != null){
                if( !(basic >=compData.min_limit && basic<= compData.max_limit)){
                     e = e + `# Gross amount for ${indEmp.emp_id} is not in the limit`
                } 
             }
		} else if (indEmp.sc_id == 2) {
			if ( compData.data_type == 'a') {
                basic = indEmp.amount;
                if(compData.min_limit != null && compData.max_limit != null){
                   if( !(basic >=compData.min_limit && basic<= compData.max_limit)){
                        e = e + `# Basic amount for ${indEmp.emp_id} is not in the limit`
                   } 
                }
			} else if(compData.data_type == 'p' && compData.percent_on == 0) {
                basic =  gross*(compData.percent/100)
                if(basic != indEmp.amount ){
                    e = e + `# basic amount is wrongly entered for ${indEmp.emp_id}` 
                }
            }
            else{
                e = e + "# basic should be configured to be taken from gross"
            }
        } else {
            if ( compData.data_type == 'a') {
                if(compData.min_limit != null && compData.max_limit != null){
                   if( !((indEmp.amount >=compData.min_limit) && (indEmp.amount<= compData.max_limit))){
                        e = e + `# Basic amount for ${indEmp.emp_id} is not in the limit`
                   }
                   else{
                       rest = rest + indEmp.amount
                   } 
                }
			} else if(compData.data_type == 'p' && compData.percent_on == 0) {
                let temp =  gross*(compData.percent/100)
                if(temp != indEmp.amount ){
                    e = e + `# basic amount is wrongly entered for ${indEmp.emp_id}` 
                }
                else{
                    rest = rest + indEmp.amount
                } 
            }
            else if(compData.data_type == 'p' && compData.percent_on == 1) {
                let temp =  basic*(compData.percent/100)
                if(temp != indEmp.amount ){
                    e = e + `# basic amount is wrongly entered for ${indEmp.emp_id}` 
                }
                else{
                    rest = rest + indEmp.amount
                } 
            }
        }

    });
  
    if(gross != basic+rest){
        e= e+ `#  Gross is not equal to sum of other components for ${element[0].emp_id}`
    }
    console.log(gross,basic,rest, e)

});
