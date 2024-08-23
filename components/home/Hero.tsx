import Link from "next/link";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="grid sm:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti quo
          cum ratione! Cum, vero tenetur temporibus officia necessitatibus velit
          eum!
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}
export default Hero;
