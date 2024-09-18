"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";

function ShareButton({ productId, name }: { productId: string; name: string }) {
  const shareLink = `${process.env.NEXT_PUBLIC_URL_WEBSITE}/products/${productId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex items-center gap-x-2 w-full"
        side="top"
        sideOffset={10}
        align="end"
      >
        <FacebookShareButton url={shareLink} title={name}>
          <FacebookIcon className="rounded-full h-8 w-8" />
        </FacebookShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon className="rounded-full h-8 w-8" />
        </LinkedinShareButton>
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon className="rounded-full h-8 w-8" />
        </TwitterShareButton>
        <EmailShareButton url={shareLink} title={name}>
          <EmailIcon className="rounded-full h-8 w-8" />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
}
export default ShareButton;
