import { getLines } from '../utils.tsx'

export function mullItOver(): number {
    let finalSum = 0;

    let memory = getLines('./src/day3/input.txt').join('');

    let regex = /mul\(([1-9]|[1-9][0-9]|[1-9][0-9][0-9]),([1-9]|[1-9][0-9]|[1-9][0-9][0-9])\)|don\'t\(\)|do\(\)/g;

    let allMatches = memory.match(regex) ?? [];

    console.log(allMatches);

    let doFlag = true;

    for(let i = 0; i < allMatches.length; i++){

        if(allMatches[i] == "do()"){
            doFlag = true;
            continue;
        } else if (allMatches[i] == "don't()"){
            doFlag = false;
            continue;
        }

        if(!doFlag){
            continue;
        }

        let numbers = allMatches[i].match(/\d+/g);

        if(numbers !== null){
            let num1 = numbers[0];
            let num2 = numbers[1];

            finalSum += Number(num1) * Number(num2);
        }
    }

    return finalSum;
}