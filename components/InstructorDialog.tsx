"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InstructorDetails } from "@/app/lib/data";
import InstructorDialogContent from "./InstructorDialogContent";

interface InstructorDialogProps {
  instructorId: string;
  instructorName: string;
  triggerElement: React.ReactNode;
}

const InstructorDialog: React.FC<InstructorDialogProps> = ({
  instructorId,
  triggerElement,
}) => {
  const [instructorDetails, setInstructorDetails] = useState<InstructorDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      if (!instructorId) return;

      setIsLoading(true);
      try {
        const res = await fetch(`/api/instructors/${instructorId}`);
        if (!res.ok) throw new Error("Failed to fetch instructor info");
        const data = await res.json();
        setInstructorDetails(data);
      } catch (error) {
        console.error("Error fetching instructor:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructorDetails();
  }, [instructorId]);

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Instructor Information</DialogTitle>
        </DialogHeader>
        <InstructorDialogContent 
          instructorDetails={instructorDetails}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InstructorDialog;