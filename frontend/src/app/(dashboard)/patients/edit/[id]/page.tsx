"use client";

import { useParams } from "next/navigation";
import React from "react";
import PatientsFormLayout from "../../_components/PatientsFormLayout";

export default function EditPatientPage() {
  const { id } = useParams();
  return (
    <PatientsFormLayout
      title="Edit Patient"
      editing={id !== null}
      id={id as string}
    />
  );
}
