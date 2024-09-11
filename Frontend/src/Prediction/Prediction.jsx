import VerticalNavbar from "../Components/VerticalNavbar";
import HorizontalNavbar from "../Components/HorizontalNavbar";
import PredictionChart from "./PredictionChart";

function Prediction() {
    return (
        <>
            <div className="flex flex-row overflow-hidden h-screen">
                <VerticalNavbar />
                <div className="flex flex-col w-full overflow-y-auto">
                    <HorizontalNavbar />
                    <PredictionChart />
                </div>
               
            </div>
        </>
    )
}

export default Prediction;