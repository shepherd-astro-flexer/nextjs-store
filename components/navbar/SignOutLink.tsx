"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";

function SignOutLink() {
  const { toast } = useToast();

  const handleSignOut = () => {
    toast({
      description: "Logged out successful.",
    });
  };
  // This authentication button by clerk is an unstyled button so we are going to nest a regular button element and then style it instead.
  return (
    <SignOutButton redirectUrl="/">
      {/* We can use the Link component to redirect to the homepage after signing out if the redirectUrl prop doesn't work as expected */}
      <button className="w-full text-left" onClick={handleSignOut}>
        Sign out
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;
