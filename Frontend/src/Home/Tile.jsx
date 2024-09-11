import React, { useState, useEffect } from 'react';
import 'react-multi-carousel/lib/styles.css';
import '../App.css';
import axios from 'axios'; 

function calculateElectricityBill(unitsConsumed) {
    let totalBill = 0;

    if (unitsConsumed <= 100) {
        totalBill = unitsConsumed * 5.50;
    } else if (unitsConsumed <= 500) {
        totalBill = (100 * 5.50) + ((unitsConsumed - 100) * 6.70);
    } else {
        totalBill = (100 * 5.50) + (400 * 6.70) + ((unitsConsumed - 500) * 7.10);
    }

    return totalBill;
}

function TileBar() {
    const [dataFetched, setDataFetched] = useState([]);
    const [energyUnit, setEnergyUnit] = useState(0);
    const [energyUnitAvg, setEnergyUnitAvg] = useState(0);
    const [solarProduction, setSolarProduction] = useState(0);

    useEffect(() => {
        async function fetchTotal() {
            try {
                const response = await axios.get('/api/energy/total', {
                    params: { date: '2024-04-26' }  
                });
                if (response.data) {
                    setDataFetched(response.data);
                }
            } catch (error) {
                console.error('Error fetching total energy data:', error);
            }
        }

        async function fetchAvg() {
            try {
                const response = await axios.get('/api/energy/average');
                if (response.data) {
                    setEnergyUnitAvg(parseInt(response.data.average, 10));
                }
            } catch (error) {
                console.error('Error fetching average energy data:', error);
            }
        }

        async function fetchSolar() {
            try {
                const response = await axios.get('/api/solar/total', {
                    params: { date: '2024-04-26' }  
                });
                if (response.data) {
                    setSolarProduction(response.data.totalSolarProduction);
                }
            } catch (error) {
                console.error('Error fetching solar data:', error);
            }
        }

        fetchTotal();
        fetchAvg();
        fetchSolar();
    }, []);

    useEffect(() => {
        if (dataFetched && dataFetched.length > 0) {
            setEnergyUnit(dataFetched[0].totalEnergy);
        }
    }, [dataFetched]);

    return (
        <>
            <div className='flex flex-col justify-items items-center'>
                <div className='grid grid-cols-4 gap-5 m-4 ml-10 mr-10 h-[20vh] w-[98%]'>
                    <div className='bg-tilebox h-full bg-white rounded-lg'>
                        <div className='flex flex-col justify-center'>
                           <div className='m-2 text-xs font-bold '>TOTAL ENERGY COST</div>
                           <span><div className='text-center m-2 text-4xl mt-10'>Rs. {calculateElectricityBill(energyUnit)}</div></span>
                        </div>
                    </div>
                    <div className='bg-tilebox h-full bg-white rounded-lg'>
                        <div className='flex flex-col justify-center'>
                            <div className='m-2 text-xs font-bold'>TOTAL ENERGY UNIT PER DAY</div>
                            <span><div className='text-center mt-10 text-4xl'>{energyUnit}</div>
                            <div className='text-center m-2 text-2xl'>KW/Hr</div></span>
                        </div>
                    </div>
                    <div className='bg-tilebox h-full bg-white rounded-lg'>
                        <div className='flex flex-col justify-center'>
                            <div className='m-2 text-xs font-bold'>AVERAGE ENERGY USAGE</div>
                            <span><div className='text-center mt-10 text-4xl'>{energyUnitAvg}</div>
                            <div className='text-center m-2 text-2xl'>KW/Hr</div></span>
                        </div>
                    </div>
                    <div className='bg-tilebox h-full bg-white rounded-lg'>
                        <div className='flex flex-col justify-center'>
                            <div className='m-2 text-xs font-bold'>TOTAL SOLAR PRODUCTION</div>
                            <span><div className='text-center mt-10 text-4xl'>{solarProduction}</div>
                            <div className='text-center m-2 text-2xl'>KW/Hr</div></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TileBar;
