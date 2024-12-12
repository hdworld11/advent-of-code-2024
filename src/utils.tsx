import * as fs from 'fs';

export function getLines(filename: string):  string[] {

    const inputList1 = fs.readFileSync(filename,'utf-8');

    let list = inputList1.split('\n');

    return list;
}