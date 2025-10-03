import * as path from 'path';
import {todayDate} from './index.js';
import * as fs from 'fs';
import csv from 'csv-parser';
import type { ProteinAmount } from './index.js';

export async function getTotalTodayProtein(){
    const csvFile = path.join("proteinRecord.csv");
    const amountReport: Map<string,number> = await getReportCSV(csvFile);
    console.log(`Your today protein consumption is ${amountReport.get(todayDate())}`);
}

export async function getTotalProtein(){
    const csvFile = path.join("proteinRecord.csv");
    const amountReport: Map<string,number> = await getReportCSV(csvFile);
    amountReport.forEach((amount, loggedDate) => {
        console.log(`${loggedDate}: ${amount}`)
    });
}

export async function getAverageProteinAmount() {
    const csvFile = path.join("proteinRecord.csv");
    const amountReport: Map<string,number> = await getReportCSV(csvFile);
    let totalAmount: number = 0;
    amountReport.forEach((amount, loggedDate) => {
            totalAmount += isNaN(amount) ? 0 : amount;
    });
    const averageAmount = totalAmount / amountReport.size;
    console.log(`Average Amount is ${averageAmount.toFixed(2)}`);
    
}

function getReportCSV(csvFile: string): Promise<Map<string, number>> {
    return new Promise((resolve,reject) => {
        const overalReport: Map<string, number> = new Map<string, number>();
        fs.createReadStream(csvFile)
        .pipe(csv())
        .on('data', (row: ProteinAmount) => {
            const amountColumn: Number = row.amount;
            const loggedDateColumn: string = row.loggedDate;
            const currentAmount: Number = overalReport.get(loggedDateColumn) ?? 0;
            overalReport.set(loggedDateColumn, Number(amountColumn)! + Number(currentAmount));
            
        })
        .on('end', () => {
            console.log('CSV successfully processed.');
            resolve(overalReport);
        })
        .on('error', (err) => {
            console.error('Error reading or parsing CSV:', err);
            reject(err);
        });
    })
}