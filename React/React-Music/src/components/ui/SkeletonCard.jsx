import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SkeletonCard = () => {
  return (
    <Card className="px-3 cursor-pointer min-w-0">
      <div className="aspect-square">
        <Skeleton className="h-full w-full rounded-md bg-indigo-100" />
      </div>
      <CardDescription>
        <Skeleton className="h-6 flex-grow bg-indigo-100" />
        <Skeleton className="h-4 mt-2 w-3/4 flex-grow bg-indigo-100" />
      </CardDescription>
    </Card>
  );
};

export default SkeletonCard;
