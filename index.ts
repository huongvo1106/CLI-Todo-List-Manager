import os = require("os");
import ts = require("typescript");
import * as fs from 'fs';
import * as path from 'path';


interface ProteinAmount {
    amount: number;
    loggedDate: string;
}

function autoCalculateDate(): string {
    return Date().substring(4,15);
}

function getTotalDailyProtein(): void {
    
}

const proteinAmountList: ProteinAmount[] = [];

function addProtein(proteinAmount: number): void {
    const newProteinAmount: ProteinAmount = {
        amount: proteinAmount,
        loggedDate: autoCalculateDate(),
    }
    proteinAmountList.push(newProteinAmount);
   
    writeToCsv(newProteinAmount);
    
    
    console.log(`${newProteinAmount.amount} is logged on ${newProteinAmount.loggedDate}.`);

}

function writeToCsv(data: ProteinAmount): void {
    try {
        const csvFile = path.join("proteinRecord.csv");
        const row: string = String(data.loggedDate) + "," + String(data.amount) + "\n";
        fs.appendFileSync(csvFile,row);
        console.log("Successfully Logged!");
    } catch (error) {
        console.error("Fail log to csv.");
    }

}

addProtein(10)
addProtein(5)
