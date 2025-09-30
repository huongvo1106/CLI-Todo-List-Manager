import os = require("os");
import ts = require("typescript");
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { log } from "console";
import { resourceUsage } from "process";



interface ProteinAmount {
    loggedDate: string;
    amount: number;
}

function autoCalculateDate(): string {
    return Date().substring(4,15);
}

function getTotalDailyProtein(): Promise<number> {
    const csvFile = path.join("proteinRecord.csv");

    return new Promise((resolve,reject) => {
        let totalValue: number = 0;
        fs.createReadStream(csvFile)
        .pipe(csv())
        .on('data', (row: ProteinAmount) => {
        const amountColumn: Number = row.amount;
        totalValue += Number(amountColumn);
        })
        .on('end', () => {
            console.log('CSV successfully processed.');
            resolve(totalValue);
        })
        .on('error', (err) => {
            console.error('Error reading or parsing CSV:', err);
            reject(err);
        });
    })
    
}

const proteinAmountList: ProteinAmount[] = [];

function addProtein(proteinAmount: number): void {
    const newProteinAmount: ProteinAmount = {
        amount: proteinAmount,
        loggedDate: autoCalculateDate(),
    }
    proteinAmountList.push(newProteinAmount);
   
    writeToCsv(newProteinAmount);
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

addProtein(10);
addProtein(5);
let totalValue = await getTotalDailyProtein();
console.log(`${totalValue}`);
