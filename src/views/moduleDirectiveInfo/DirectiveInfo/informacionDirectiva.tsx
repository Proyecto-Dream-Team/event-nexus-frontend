import { DirectiveInfoData } from '../../../domain/directiveInfo'
import { CardInfoDirectiva } from './cardInfoDirectiva'
import './informacionDirectiva.css'

const mockDirective = new DirectiveInfoData(
    0,
    "Pedro Geraghty",
    'profileImage.png',
    '12/06/2024',
    "lLorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, eos impedit aperiam itaque delectus autem veniam harum accusantium voluptatum omnis dolorum nulla qui aut? Pariatur nulla facilis dicta praesentium et!",
    true
)

const directives = [mockDirective,mockDirective]


export const InformacionDirectiva = () => {
    return(<>
        <div className="background">
        {
                directives.map((directive, index) => (
                    <CardInfoDirectiva key={index} value={directive} />
                ))
            }
        </div>
    </>)
}