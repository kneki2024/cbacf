const generate_xlsx = require('./generate_xlsx');

function IRRCalc(CArray, maxIterations = 100000) {
    let min = -1000000;
    let max = 1000000;
    let iterationCount = 0;
    let guest = 0;
    
    do {
        guest = (min + max) / 2;
        var NPV = 0;
        
        for (let j = 0; j < CArray.length; j++) {
            NPV += CArray[j] / Math.pow((1 + guest), j);
        }
        
        if (NPV > 0) {
            min = guest;
        } else {
            max = guest;
        }
        
        iterationCount++;
    } while (Math.abs(NPV) > 0.001 && iterationCount < maxIterations);
    
    if (iterationCount >= maxIterations) {
        console.log("Max iterations reached without convergence");
        return null;
    }
    
    return guest;
}


var calculation_core = (cal_input) => {
    // Retrieve values from HTML input fields
    const newProj = cal_input.newProj;
    const PPeriod = cal_input.PPeriod;
    const ConstrCost = cal_input.ConstrCost;
    const MaintnCost = cal_input.MaintnCost;
    const IntrR = cal_input.IntrR;
    const CMF = cal_input.CMF;
    const Pop = cal_input.Pop;

    const BKspd=cal_input.BKspd;        
    const WKspd=cal_input.WKspd;      
    const PTspd = cal_input.PTspd;     
    const Carspd = cal_input.Carspd;

    const TripPur = cal_input.TripPur;

    const DivCar = cal_input.DivCar;
    const DivWalk = cal_input.DivWalk;
    const DivPT = cal_input.DivPT;

    // const CostCrash = 126400;
    const BCostCrash = cal_input.BCostCrash;
    const indFactor = cal_input.indFactor;
    const VehOcc = cal_input.VehOcc;
    const CycPerc = cal_input.CycPerc;
    const RedMort = cal_input.RedMort;
    const MortRate = cal_input.MortRate;
    const StatValueLife = cal_input.StatValueLife;

    const StoFatal = cal_input.SIF;

    const CostCrash = (StatValueLife + StoFatal * StatValueLife * (17.5/70)) / (StoFatal + 1);
    // Value of Travel time saving is:
    const VOT = cal_input.VOT;

    EmmCost_set = cal_input.EmmCost;
    var EmmCost = [
        44, 45, 46, 47, 48, 49,
        50, 51, 52, 53, 55, 56, 57, 58,
        60, 61, 63, 64, 65, 67, 68, 70,
        71, 73, 75, 76, 78
    ];

    if (EmmCost_set == 'Med'){
        EmmCost = [65.5, 67.0, 68.5, 70.5, 72.0, 73.5, 75.0, 76.5, 78.5, 80.0, 82.0, 84.0, 85.5, 87.5, 90.0, 91.5, 94.0, 96.0, 98.0, 100.5, 102.5, 105.0, 107.0, 109.5, 112.0, 114.5, 117.0];
    }else if (EmmCost_set == 'Max'){
        EmmCost = [87, 89, 91, 94, 96, 98, 100, 102, 105, 107, 109, 112, 114, 117, 120, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 153, 156];
    }

    const vehEmm = cal_input.vehEmm;
    var CrashRate = cal_input.CrashRate;
    var BCrashRate = cal_input.BCrashRate;
    const GrowthNew = cal_input.GrowthNew;

    // Billion to Million crash rate conversion
    CrashRate = CrashRate / 1000;
    BCrashRate = BCrashRate / 1000;

    // Initialize Output Matrix
    console.log(CostCrash);
    // Perform Calculations
    IndBKLen = Pop*315; 
    ExistBKLen = IndBKLen/0.88;   
    TotBKLen = ExistBKLen+IndBKLen;

    // Calculate accident prevention benefits
    const AccPr_1 = ((TotBKLen-ExistBKLen)/1000000)*(TripPur[0]+TripPur[1])*DivCar/VehOcc*CrashRate*CostCrash*indFactor/1000000;
    const AccPr_2 = ((ExistBKLen)/1000000)*BCrashRate*CostCrash*(1-CMF)/1000000;
    const AccPr = AccPr_1 + AccPr_2
    // Calculate health benefits due to decreased mortality
    const H_M = Pop * CycPerc * ((TotBKLen - ExistBKLen) / ExistBKLen) * RedMort * MortRate * StatValueLife * indFactor / 1000000;
    // Calculate emission cost savings
    // const emissionFactorSum = EmmCost.reduce((a, b, index) => a + b *   (vehEmm[index] || 0), 0);

    const Emmision = (TotBKLen - ExistBKLen) * (TripPur[0] + TripPur[1]) * DivCar / VehOcc * EmmCost[0] * vehEmm * indFactor * 0.00000110231131 / 1000000;

    const AccPr1_INT = ((TotBKLen - ExistBKLen) / 1000000) * (TripPur[0] + TripPur[1]) * DivCar / VehOcc * CrashRate * indFactor;
    const AccPr2_INT = (ExistBKLen / 1000000) * CrashRate * (1-CMF);
    const AccPr_INT = AccPr1_INT + AccPr2_INT;


    // console.log(((TotBKLen - ExistBKLen) / ExistBKLen));
    // console.log(Pop);
    // console.log(CycPerc);
    // console.log(RedMort);
    // console.log(MortRate);
    // console.log(indFactor);
    const H_M_INT = Pop * CycPerc * ((TotBKLen - ExistBKLen) / ExistBKLen) * RedMort * MortRate * indFactor;
    // console.log(H_M_INT);
    const Emmision_INT = (TotBKLen - ExistBKLen) * (TripPur[0] + TripPur[1]) * DivCar / VehOcc * vehEmm * 0.0000001 * indFactor;


    DivCarDist=(((TotBKLen-ExistBKLen)*(TripPur[0]+TripPur[1]))*DivCar);
    DivWKDist=(((TotBKLen-ExistBKLen)*(TripPur[0]+TripPur[1]))*DivWalk);
    DivPTDist=(((TotBKLen-ExistBKLen)*(TripPur[0]+TripPur[1]))*DivPT);

    TTS = VOT*((DivCarDist/Carspd-DivCarDist/BKspd)+(DivWKDist/WKspd-DivWKDist/BKspd)+(DivPTDist/PTspd-DivPTDist/BKspd))*indFactor/1000000;

    const TTS_INT = ((DivCarDist / Carspd - DivCarDist / BKspd) +
                     (DivWKDist / WKspd - DivWKDist / BKspd) +
                     (DivPTDist / PTspd - DivPTDist / BKspd)) * indFactor;
    // Initialize Output Matrix
    var OutputM = Array.from({ length: PPeriod + 1 }, () => new Array(12).fill(0));

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
        OutputM[n][9] = AccPr_INT * Math.pow(1 + GrowthNew, n - 1);
        OutputM[n][10] = H_M_INT * Math.pow(1 + GrowthNew, n - 1);
        OutputM[n][11] = Emmision_INT * Math.pow(1 + GrowthNew, n - 1) * EmmCost[n-1] / EmmCost[0]; // Assume CO2 cost is handled within
        OutputM[n][12] = TTS_INT * Math.pow(1 + GrowthNew, n - 1);
    }


    // Convert to unit of 1000 dollars
    OutputM.forEach(row => {
        for (let index = 1; index < 9; index++) {
            row[index] = row[index] * 1000;
        }
    });


    // console.log(OutputM)
    // Calculate Net Present Value (NPV) and Internal Rate of Return (IRR)

    var IRR = IRRCalc(OutputM.map(row => row[8]));

    var NPV = OutputM.reduce((acc, cur) => acc + cur[8], 0);
    // console.log(`Calculated NPV: ${NPV}`);
    // console.log(`Calculated IRR: ${IRR}`);
    const now = new Date();
    name = `Output_result_${now.toISOString()}.xlsx`
    generate_xlsx(cal_input, OutputM, NPV, IRR, name);
    
    return {
        Output: OutputM,
        NPV: NPV,
        IRR: IRR,
        name: name
    }
}


module.exports = calculation_core;
