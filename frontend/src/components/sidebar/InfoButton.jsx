import { Info } from "lucide-react";
import { Link } from "react-router-dom";

const InfoButton = () => {
  return (
    <div>
      <Link
        to={"/about"}
        className="h-6 text-white cursor-pointer w-full flex space-x-3"
      >
        <Info className="w-6 h-6 text-white cursor-pointer" />
      </Link>
    </div>
  );
};
export default InfoButton;
