"use client";

import { Skeleton } from "@/components/ui/skeleton";
import PatientsFormLayout from "../../_components/PatientsFormLayout";
import { Suspense, use } from "react";

function EditPatientPageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="flex items-center gap-4 rounded-md border p-4">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export default function EditPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Suspense fallback={<EditPatientPageSkeleton />}>
      <PatientsFormLayout
        title="Edit Patient"
        editing={id !== undefined}
        id={id as string}
      />
    </Suspense>
  );
}
