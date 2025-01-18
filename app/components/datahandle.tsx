import { Infocard } from "./dataDisplay/informationCard";
import { ContestDisplay } from "./dataDisplay/contest";
import WrongProblemsCard from "./dataDisplay/wrongquescard";
import LanguageUsed from "./dataDisplay/language";
import DataDisplay from "./dataDisplay/accuracy";
import Verdict from "./dataDisplay/failedcase";


export function DataHandle(UserHandle_display:{userHandle : string}){
  
  if (UserHandle_display === null || UserHandle_display === undefined) {
    return <div>get analyze of your profile enter user handle</div>;
  }

  return (
    <div>
      <div className="p-4 m-auto w-full">
        <Infocard userHandle={UserHandle_display} />
      </div>

       <div className="flex justify-center ">
        <div className=" w-full h-auto pt-10 pb-10 ">
          <ContestDisplay userHandle={UserHandle_display} />
        </div>
      </div>

      <div className="">
        <div className="col-span-4 col-start-2">
          <WrongProblemsCard userHandle={UserHandle_display} />
        </div>
      </div>

      <div className="flex justify-center mb-5">
        <div className="m-4 w-4/5 h-auto pt-10">
          <LanguageUsed userHandle={UserHandle_display} />
        </div>
      </div>

      <div className="flex justify-center p-5">
        <div className="w-4/5 h-auto pt-8 ">
          <h1 className="text-5xl text-[#c9b57a] font-serif font-bold m-3 text-center">Frequency Of Wrong Topics</h1>
          <DataDisplay userHandle={UserHandle_display} />
        </div>
      </div>

      <div className="flex justify-center m-5 mb-0">
        <div className="m-4 w-4/5 h-auto pt-8 pb-10">
          <Verdict userHandle={UserHandle_display} />
        </div>
      </div>
    </div> 
  );
}