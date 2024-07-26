import * as React from 'react';
import { Button } from '@mui/material';

/* -------------------------------------------------------------------------- */

interface ButtonProps {
    title: string;
    disabled?: boolean;
}


export default function CustomButton({ title, disabled }: ButtonProps) {
    return (
        <Button variant="text" disabled={disabled ?? false}>{title}</Button>
    );
}
