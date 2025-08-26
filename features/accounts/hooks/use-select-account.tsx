import { useState, JSX, useRef } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { Button } from "@/components/ui/button";
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,DialogTitle 
} from "@/components/ui/dialog";
import { Select } from "@/components/select";

export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({
        name
    });

    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }));


    const [promise, setPromise] = useState<{resolve: (value: string | undefined) => void } | null>(null);

    const selectValue = useRef<string>(undefined);

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(selectValue.current);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(undefined);
        handleClose();
    }

    const ConfirmationDialog = () => {
        return (
            <Dialog open={promise !== null} onOpenChange={(open) => !open && handleClose()}>
                <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>
                            Select an Account
                        </DialogTitle>
                        <DialogDescription>
                            Please select an account to continue.
                        </DialogDescription>
                    </DialogHeader>
                    <Select 
                        options={accountOptions}
                        placeholder="Select an Account"
                        onCreate={onCreateAccount}
                        onChange={(value) => selectValue.current = value}
                        disabled={accountMutation.isPending || accountQuery.isLoading }
                    />
                    <DialogFooter className="pt-2">
                        <Button
                        onClick={handleCancel}
                        variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button
                        onClick={handleConfirm}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
    return [ConfirmationDialog, confirm];
}