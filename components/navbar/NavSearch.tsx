import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      placeholder="search product..."
      className="max-w-xs dark:bg-muted"
      type="search"
    />
  );
}
export default NavSearch;
