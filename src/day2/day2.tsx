import { getLines } from '../utils.tsx'

export function getProcessedReports(): number {

    let listResults = getLines('./src/day2/input.txt');

    let numSafeReports = 0;

    for(let i = 0; i < listResults.length; i++){

        let report = listResults[i].split(' ');

        if(isReportSafe(report.map(Number))){
            numSafeReports++;
        }
    }

    return numSafeReports;
}

export function getProcessedReports_withDampener(): number {

    let numSafeReports = 0;

    let listResults = getLines('./src/day2/input.txt');

    for(let i = 0; i < listResults.length; i++){

        let report = listResults[i].split(' ').map(Number);

        if(isReportSafe(report)){
            numSafeReports++;
            continue;
        }
        else{
            let tempList = Array.from(report);
            for(let k = 0; k < report.length; k++){
                //remove item at index
                tempList.splice(k,1);

                if(isReportSafe(tempList)){
                    numSafeReports++;
                    break;
                } else {
                    tempList = Array.from(report);
                }
            }
        }
    }

    return numSafeReports;
}

function isReportSafe(levels: number[]): boolean {

    let numIncreasing = 0;
    let numDecreasing = 0;

    for(let i = 0; i < levels.length; i++){

        if(i == 0){
            continue;
        }

        let levelDifference = levels[i] - levels[i-1];

        if(Math.abs(levelDifference) < 1 || Math.abs(levelDifference) > 3){
            return false;
        }

        if(levelDifference < 0){
            if(numIncreasing != 0){
                return false;
            }

            numDecreasing++;
            continue;
        } else if(levelDifference > 0){
            if(numDecreasing != 0){
                return false;
            }

            numIncreasing++;
            continue;
        }
    }


    if(numDecreasing == levels.length-1 || numIncreasing == levels.length-1){
        return true;
    }

    return false;
}