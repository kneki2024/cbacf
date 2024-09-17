function IRRCalc(CArray) {
  min = 0;
  max = 1000000;
  do {
    guest = (min + max) / 2;
    NPV = 0;
    for (var j=0; j<CArray.length; j++) {
          NPV += CArray[j]/Math.pow((1+guest),j);
    }    if (NPV > 0) {
      min = guest;    }
    else {
      max = guest;
    }
  } while(Math.abs(NPV) > 0.001);
  return guest;
}

// Retrieve values from HTML input fields
const newProj = 10;
const PPeriod = 20;
const ConstrCost = 50000*newProj;
const MaintnCost = 0.1 * ConstrCost;
const IntrR = 0.06;
const CMF = 0.41
const Pop = 5000;

const BKspd=9;        
const WKspd=3.4;      
const PTspd = 15;     
const Carspd = 35;


const TripPur = [
  0.186,
  0.353,
  0.461
];
const DivCar = 0.2;

const DivWalk = 0.3;
const DivPT = 0.5;

// const CostCrash = 126400;
const BCostCrash = 12640;
const indFactor = 0.5;
const VehOcc = 1.51
const CycPerc = 0.549;
const RedMort = 0.045;
const MortRate = 252 / 100000;
var CostCollision = [12700000, 181700, 16600];

const GDP = 1000000000000;
const Capita = 50000000;
CostCollision[0]=70*GDP/Capita;
CostCollision[1]=181700/12700000*70*GDP/Capita;
CostCollision[2]=16600/12700000*70*GDP/Capita;
CrashFreq=[0.007,0.281,0.712];

const CostCrash = CostCollision.reduce((acc, curr, index) => acc + curr * CrashFreq[index], 0);
// Value of Travel time saving is:
const VOT = Math.exp(-4.191) * Math.pow(GDP / Capita, 0.696);


const EmmCost = [
    44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 55, 56, 57, 58,
    60, 61, 63, 64, 65, 67, 68, 70,
    71, 73, 75, 76, 78
];
const vehEmm = 288.394;
const CrashRate = 1.04;
const BCrashRate = 0.045;
const GrowthNew = 0.08;

// Initialize Output Matrix

// Perform Calculations
IndBKLen = Pop*315/1.6; 
ExistBKLen = IndBKLen/0.8;   
TotBKLen = ExistBKLen+IndBKLen;

// Calculate accident prevention benefits
const AccPr_1 = ((TotBKLen-ExistBKLen)/1000000)*(TripPur[0]+TripPur[1])*DivCar/VehOcc*CrashRate*CostCrash*indFactor/1000000;
const AccPr_2 = ((ExistBKLen)/1000000)*BCrashRate*BCostCrash*CMF/1000000;
const AccPr = AccPr_1 + AccPr_2
// Calculate health benefits due to decreased mortality
const H_M = Pop * CycPerc * ((TotBKLen - ExistBKLen) / ExistBKLen) * RedMort * MortRate * CostCollision[0] * indFactor / 1000000;

// Calculate emission cost savings
// const emissionFactorSum = EmmCost.reduce((a, b, index) => a + b *   (vehEmm[index] || 0), 0);

const Emmision = (TotBKLen - ExistBKLen) * (TripPur[0] + TripPur[1]) * DivCar / VehOcc * EmmCost[0] * vehEmm * indFactor * 0.00000110231131 / 1000000;
DivCarDist=(((TotBKLen-ExistBKLen)*(TripPur[0]+TripPur[1]))*DivCar);
DivWKDist=(((TotBKLen-ExistBKLen)*(TripPur[0]+TripPur[1]))*DivWalk);
DivPTDist=(((TotBKLen-ExistBKLen)*(TripPur[0]+TripPur[1]))*DivPT);

TTS = VOT*((DivCarDist/Carspd-DivCarDist/BKspd)+(DivWKDist/WKspd-DivWKDist/BKspd)+(DivPTDist/PTspd-DivPTDist/BKspd))*indFactor/1000000;

// Initialize Output Matrix
var OutputM = Array.from({ length: PPeriod + 1 }, () => new Array(8).fill(0));

// Fill the year column
OutputM.forEach((item, index) => item[0] = index);

// Construction cost for the first year in millions
OutputM[0][1] = ConstrCost / 1000000;

OutputM[0][7] = -OutputM[0][1]
OutputM[0][8] = -OutputM[0][1]

// Maintenance cost from the second year onward in millions
OutputM.forEach((item, index) => {
    if (index >= 1) {
        item[2] = MaintnCost / 1000000;
    }
});

// Populate benefits and other values
for (let n = 1; n <= PPeriod; n++) {
    OutputM[n][3] = AccPr * Math.pow(1 + GrowthNew, n - 1);
    OutputM[n][4] = H_M * Math.pow(1 + GrowthNew, n - 1);
    OutputM[n][5] = Emmision * Math.pow(1 + GrowthNew, n - 1) * EmmCost[n-1] / EmmCost[0]; // Assume CO2 cost is handled within
    OutputM[n][6] = TTS * Math.pow(1 + GrowthNew, n - 1);
    OutputM[n][7] = OutputM[n][3] + OutputM[n][4] + OutputM[n][5] + OutputM[n][6] - OutputM[n][1] - OutputM[n][2];
    OutputM[n][8] = OutputM[n][7] / Math.pow((1 + IntrR), n-1);
}

// Convert to unit of 1000 dollars
OutputM.forEach(row => {
    for (let index = 1; index < 9; index++) {
        row[index] = row[index] * 1000;
    }
});


console.log(OutputM)
// Calculate Net Present Value (NPV) and Internal Rate of Return (IRR)

var IRR = IRRCalc(OutputM.map(row => row[7]));

var NPV = OutputM.reduce((acc, cur) => acc + cur[8], 0);
console.log(`Calculated NPV: ${NPV}`);
console.log(`Calculated IRR: ${IRR}`);


