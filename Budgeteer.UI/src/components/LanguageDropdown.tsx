import i18next, { changeLanguage } from 'i18next';
import { FC } from 'react';
import {
    MenuItem,
    FormControl,
    Select,
    SelectChangeEvent,
} from '@mui/material';

const style = {
    '&.MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        borderColor: 'black',
        '&.Mui-focused fieldset': {
            borderColor: 'black',
            borderWidth: '1px',
        },
    },
};

export const LanguageDropdown: FC = () => {
    return (
        <FormControl sx={{ m: 1, borderColor: '#fff' }} size="small">
            <Select
                sx={style}
                value={i18next.language}
                onChange={(event: SelectChangeEvent) => {
                    changeLanguage(event.target.value, () => {
                        localStorage.setItem('i18nextLng', event.target.value);
                    });
                }}
            >
                <MenuItem value={'en-US'} key={'en-US'}>
                    en-us
                </MenuItem>
                <MenuItem value={'en-GB'} key={'en-gb'}>
                    en-gb
                </MenuItem>
            </Select>
        </FormControl>
    );
};
