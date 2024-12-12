import { getLines } from '../utils.tsx'

export function getSafeReports(): number {

    let numSafeReports = 0;

    let listResults = getLines('./src/day2/input.txt');

    for(let i = 0; i < listResults.length; i++){

        let report = listResults[i].split(' ');

        //going to hold the occurence of increasing and decreasing
        let differenceMap = new Map<number, number>();

        for(let i = 0; i < report.length; i++){

            if (i == 0)
                continue;

            let prevLevel = Number(report[i-1]);
            let currLevel = Number(report[i]);

            let levelDifference = currLevel - prevLevel;

            if(Math.abs(levelDifference) < 1 || Math.abs(levelDifference) > 3){
                // too much difference, break out
                break;
            }

            if(levelDifference < 0){
                if(differenceMap.get(1) !== undefined)
                    // report is not safe, break out of loop
                    break;

                differenceMap.set(-1, (differenceMap.get(-1) ?? 0) + 1);
            } else if (levelDifference > 0){
                if(differenceMap.get(-1) !== undefined)
                    //report is not safe, break out of loop
                    break;
                differenceMap.set(1, (differenceMap.get(1) ?? 0) + 1)
            }
            else{
                // difference is 0, unsafe, break
                break;
            }
        }

        if(differenceMap.get(1) == report.length-1 || differenceMap.get(-1) == report.length-1){
            numSafeReports++;
        }
    }

    return numSafeReports;
}