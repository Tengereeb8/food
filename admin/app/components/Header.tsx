import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "../auth/GetUser";

export const Header = async () => {
  const user = await getUser();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuGroup>
            <DropdownMenuItem>{user.email}</DropdownMenuItem>
            <DropdownMenuItem>{user.address}</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
