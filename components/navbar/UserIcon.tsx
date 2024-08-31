import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { LuUser2 } from "react-icons/lu";

// the currentUser is an asynchronous method that is coming from clerk/nextjs/server returns the current users login credentials i.e name, image, id
// we can also use the auth method which is not async but only returns the ID
async function UserIcon() {
  const user = await currentUser();
  const profileImg = user?.imageUrl;

  if (profileImg) {
    // we just use the regular img element here because we need to do few more things in order for the nextjs Image component to work properly ^^'
    return (
      <img
        src={profileImg}
        alt="profileImg"
        className="object-cover h-6 w-6 rounded-full"
      />
    );
  }

  return <LuUser2 className="h-6 w-6 bg-primary text-white rounded-full" />;
}
export default UserIcon;
