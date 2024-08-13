import { FaCode } from "react-icons/fa6";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

function Logo() {
  return (
    <Button asChild size="icon">
      <Link href="/">
        <FaCode className="w-6 h-6" />
      </Link>
    </Button>
  );
}
export default Logo;
