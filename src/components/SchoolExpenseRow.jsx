import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import SchoolExpenseStatus from "./SchoolExpenseStatus";

function SchoolExpenseRow({ status, processDate, processID, amount }) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="icon elements-center-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500 text-white">
            <HiMiniArrowTrendingUp className="text-xl md:text-2xl" />
          </div>
          <div className="text">
            <p className="font-bold text-xs md:text-sm process-id">
              {processID}
            </p>
            <p className="text-[10px] text-secondary process-date">
              {processDate}
            </p>
          </div>
        </div>
      </td>
      <td className="font-semibold text-sm md:text-base text-center">
        {amount}
      </td>
      <td>
        <SchoolExpenseStatus status={status} />
      </td>
    </tr>
  );
}

export default SchoolExpenseRow;
