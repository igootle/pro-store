"use client";
import { startTransition, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogHeader, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "../ui/alert-dialog";



const DeleteDialog = ({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, strartTransiton] = useTransition();
  
  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id)

      if(!res.success) {
        toast.error(res.message)

      } else {
        setOpen(false)
        toast.success(res.message)
      }
    })
  }

  return <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogTrigger asChild>
      <Button size='sm' variant='destructive' className="ml-2">Delete</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>This action can't be undone</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button variant='destructive' size='sm' disabled={isPending} onClick={handleDeleteClick} >
          {isPending ? 'Deleteing...' : 'Delete'}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>;
};

export default DeleteDialog;
