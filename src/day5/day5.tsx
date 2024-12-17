import { getLines } from '../utils.tsx'


let orderMap = new Map<number,number[]>();

export function day5Part1(): number {
    let returnNumber = 0;
    let returnArray = [];
    let badArray = [];

    let inputLines = getLines('./src/day5/input.txt');

    
    let updates: Array<Array<number>> = [];
    let updateRow = 0;

    for(let row=0; row < inputLines.length; row++){

        if(inputLines[row].includes("|")){
            let updateOrder = inputLines[row].split('|');

            let afterNumbers = orderMap.get(Number(updateOrder[0])) ?? [];

            afterNumbers.push(Number(updateOrder[1]));

            orderMap.set(Number(updateOrder[0]),afterNumbers);
        }

        if(inputLines[row].includes(",")){
            let updateLine = inputLines[row].split(',');
            updates[updateRow] = updateLine.map(Number);
            updateRow++;
        }
    }

    for(const update of updates){

        let isValid = true;

        for(const num of update){
            let numIndex = update.indexOf(num);
            let numsToCheck = orderMap.get(num);

            if(numsToCheck !== undefined){
                for(const numToCheck of numsToCheck){
                    let numToCheckIndex = update.indexOf(numToCheck);

                    if(numToCheckIndex >= 0 && numToCheckIndex <= numIndex){
                        isValid = false;
                        break;
                    }
                }
            }
        }

        if(isValid){
            returnArray.push(update);
        }
        else {
            badArray.push(update);
        }
    }

    for(const badUpdate of badArray) {
        // console.log("before: " + badUpdate);
        reOrderArray(badUpdate);
        // console.log("after: " + badUpdate);
    }

    for(const returnUpdate of badArray){
        let middleNumber = returnUpdate[Math.floor(returnUpdate.length / 2)]

        returnNumber += middleNumber;
    }

    return returnNumber;
}

// is num1 > num2
function isNum1BeforeNum2(num1: number, num2: number): boolean {

    let num1Successors = orderMap.get(num1);
    let num2Successors = orderMap.get(num2);

    if(num1Successors?.includes(num2)){
        return true;
    } else if(num2Successors?.includes(num1)){
        return false;
    }

    return true;
}

function reOrderArray(inputArray: number[]): number[] {

    for(let i=0; i < inputArray.length; i++){

        let subArray = inputArray.slice(i+1,inputArray.length);
        // console.log("subArray: " + subArray);

        let numToCheck = inputArray[i];

        for(let k=0; k<subArray.length; k++){
            if(!isNum1BeforeNum2(numToCheck,subArray[k])){
                // console.log("num1 not before num2, swapping: " + inputArray + ", " + subArray[k]);
                inputArray[inputArray.indexOf(subArray[k])] = numToCheck;
                inputArray[i] = subArray[k];
                numToCheck = subArray[k];
                // console.log("index of num" + inputArray.indexOf(subArray[k]));
                
            }
        }

        // console.log("end of loop: " + inputArray);
    }

    return inputArray;
}

