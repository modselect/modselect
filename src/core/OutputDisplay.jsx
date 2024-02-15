import { TextArea } from '@radix-ui/themes';

const OutputDisplay = ({outputText}) => {

    const handleTextChange = (e) => {

    }
    
    return (
        <div >
            <TextArea placeholder='Output' value={outputText} onChange={handleTextChange}/>
        </div>
    )
};

export default OutputDisplay;
