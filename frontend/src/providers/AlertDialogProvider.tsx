"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { useAlertStore } from "@/hooks/use-alert-store";
import React from "react";
import { useShallow } from "zustand/react/shallow";

const AlertDialogProvider = () => {
  const { isOpen, alertConfig, updateAlertState } = useAlertStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      alertConfig: state.alertConfig,
      updateAlertState: state.updateAlertState,
    })),
  );

  const handleConfirm = () => {
    alertConfig?.onConfirm?.();
    updateAlertState(false);
  };

  const handleCancel = () => {
    alertConfig?.onCancel?.();
    updateAlertState(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={updateAlertState}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {alertConfig?.title || "Confirmation Required"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="user-select-none">
          {alertConfig?.description || "Are you sure you want to proceed?"}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {alertConfig?.cancelLabel || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {alertConfig?.confirmLabel || "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogProvider;
