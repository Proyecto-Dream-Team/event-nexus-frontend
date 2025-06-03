import { Box, InputAdornment, TextField } from '@mui/material'
import { DirectiveInfoData } from '../../../domain/directiveInfo'
import { CardInfoDirectiva } from './cardInfoDirectiva'
import './informacionDirectiva.css'
import { AccountCircle } from '@mui/icons-material'

const mockDirective = new DirectiveInfoData(
    1,
    "profileImage.png",
    "Titulo",
    '12/06/2024',
    "lLorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, eos impedit aperiam itaque delectus autem veniam harum accusantium voluptatum omnis dolorum nulla qui aut? Pariatur nulla facilis dicta praesentium et!"
)

const directives = [mockDirective,mockDirective,mockDirective,mockDirective]

export const InformacionDirectiva = () => {
    return (
        <>
            <div className="fixed-background" />
            <div className="scrollable-content">
                {directives.map((directive, index) => (
                    <CardInfoDirectiva key={index} value={directive} />
                ))}
            </div>
        </>
      );
}