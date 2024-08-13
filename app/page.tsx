import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl">HomePage</h1>
      <Button variant="outline" size="default" className="capitalize">
        submit
      </Button>
    </div>
  );
}
export default HomePage;
