import VerticalNavbar from '../Components/VerticalNavbar';
import HorizontalNavbar from '../Components/HorizontalNavbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Auth/AuthContext';

function AddData() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);
    const [date, setDate] = useState('');
    const [energyEastCampus, setEnergyEastCampus] = useState('');
    const [energyMbaMca, setEnergyMbaMca] = useState('');
    const [energyCivil, setEnergyCivil] = useState('');
    const [energyMech, setEnergyMech] = useState('');
    const [energyAuto, setEnergyAuto] = useState('');

    const [solarEnergyEastCampus, setSolarEnergyEastCampus] = useState('');
    const [solarEnergyMbaMca, setSolarEnergyMbaMca] = useState('');
    const [solarEnergyCivil, setSolarEnergyCivil] = useState('');
    const [solarEnergyMech, setSolarEnergyMech] = useState('');

    const handleEnergyChange = (setEnergy) => (event) => {
        const value = event.target.value;
        if (!isNaN(value)) {
            setEnergy(value);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    const resetForm = () => {
        setDate('');
        setEnergyEastCampus('');
        setEnergyMbaMca('');
        setEnergyCivil('');
        setEnergyMech('');
        setEnergyAuto('');
        setSolarEnergyEastCampus('');
        setSolarEnergyMbaMca('');
        setSolarEnergyCivil('');
        setSolarEnergyMech('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const totalEnergy = Number(energyEastCampus) + Number(energyMbaMca) + Number(energyCivil) + Number(energyMech) + Number(energyAuto);
            const totalSolar = Number(solarEnergyEastCampus) + Number(solarEnergyMbaMca) + Number(solarEnergyCivil) + Number(solarEnergyMech);

            await axios.post('http://localhost:5000/api/energy', {
                date,
                energy: {
                    East_Campus: Number(energyEastCampus),
                    MBA_MCA: Number(energyMbaMca),
                    Civil: Number(energyCivil),
                    Mech: Number(energyMech),
                    Auto: Number(energyAuto),
                    Total: totalEnergy
                },
                solarEnergy: {
                    East_Campus: Number(solarEnergyEastCampus),
                    MBA_MCA: Number(solarEnergyMbaMca),
                    Civil: Number(solarEnergyCivil),
                    Mech: Number(solarEnergyMech),
                    Total: totalSolar
                }
            });

            console.log('Data submitted successfully');

            resetForm();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <>
            <div className="flex flex-row overflow-hidden h-screen">
                <VerticalNavbar />
                <div className="flex flex-col w-full overflow-y-auto ">
                    <HorizontalNavbar />
                    <form className="m-4 grid grid-cols-2 gap-4 w-[40%]" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Date:</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field p-2 " />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Energy for East Campus:</label>
                            <input type="text" value={energyEastCampus} onChange={handleEnergyChange(setEnergyEastCampus)} className="input-field  p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Energy for MBA and MCA:</label>
                            <input type="text" value={energyMbaMca} onChange={handleEnergyChange(setEnergyMbaMca)} className="input-field p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Energy for Civil:</label>
                            <input type="text" value={energyCivil} onChange={handleEnergyChange(setEnergyCivil)} className="input-field p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Energy for Mech:</label>
                            <input type="text" value={energyMech} onChange={handleEnergyChange(setEnergyMech)} className="input-field p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Energy for AUTO:</label>
                            <input type="text" value={energyAuto} onChange={handleEnergyChange(setEnergyAuto)} className="input-field p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Solar Energy for East Campus:</label>
                            <input type="text" value={solarEnergyEastCampus} onChange={handleEnergyChange(setSolarEnergyEastCampus)} className="input-field p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Solar Energy for MBA and MCA:</label>
                            <input type="text" value={solarEnergyMbaMca} onChange={handleEnergyChange(setSolarEnergyMbaMca)} className="input-field p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Solar Energy for Civil:</label>
                            <input type="text" value={solarEnergyCivil} onChange={handleEnergyChange(setSolarEnergyCivil)} className="input-field p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-black p-2">Enter Solar Energy for Mech:</label>
                            <input type="text" value={solarEnergyMech} onChange={handleEnergyChange(setSolarEnergyMech)} className="input-field p-2" />
                        </div>
                        <span>
                            <input type="submit" value="Submit" className="m-2 p-2 bg-blue-500 text-white cursor-pointer col-span-2 w-[40%]" />
                            <button type="button" className="m-2 p-2 bg-red-500 text-white cursor-pointer col-span-2 w-[40%]" onClick={resetForm}>Reset</button>
                        </span>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddData;
