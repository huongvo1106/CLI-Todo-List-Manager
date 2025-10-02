import os = require("os");
import ts = require("typescript");
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { log } from "console";
import { resourceUsage } from "process";
import prompt from 'prompt-sync';

interface ProteinAmount {
    loggedDate: string;
    amount: number;
}

function autoCalculateDate(): string {
    return Date().substring(4,15);
}

function getTotalDailyProtein(): Promise<number> {
    const csvFile = path.join("proteinRecord.csv");
    return getTotalDailyProteinFromCSV(csvFile);
}

function getTotalDailyProteinFromCSV(csvFile: string): Promise<number> {
    return new Promise((resolve,reject) => {
        let totalValue: number = 0;
        fs.createReadStream(csvFile)
        .pipe(csv())
        .on('data', (row: ProteinAmount) => {
            const amountColumn: Number = row.amount;
            const loggedDateColumn: String = row.loggedDate;
            if (loggedDateColumn == autoCalculateDate()) {
                totalValue += Number(amountColumn);
            } 
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

function report(): void {
    const overalReport: Map<string, number> = new Map<string, number>;

    try {
        const csvFile = path.join("proteinRecord.csv");

    } catch {
       console.error("Fail log to get data from csv."); 
    }
}

// --- Execution function ---
function main():void {
    console.log("Choose your application function:")
    console.log("Type 1 if you want the today report")
    const syncPrompt = prompt();
    const userOption: String | null = syncPrompt("What is your option? ");
    if (userOption === "1") {
        report();
    } else if (userOption === "2") {
        getTotalDailyProtein();         
    } else if (userOption === "3") {
        while(true) {
            const loggedAmount: String | null = syncPrompt("Enter your protein amount: ");
            if (!isNaN(Number(loggedAmount))) {
                addProtein(Number(loggedAmount));
                break;
            }
        }
    } else {
        console.log("Thank you!");
    }
    
}

main();