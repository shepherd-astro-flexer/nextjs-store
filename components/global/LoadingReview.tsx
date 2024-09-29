import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function LoadingReview() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader className="p-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
export default LoadingReview;
