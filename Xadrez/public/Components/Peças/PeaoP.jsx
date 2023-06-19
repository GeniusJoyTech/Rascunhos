import './css/pecas.css'
const PeaoP = (props) => {
    const { id } = props;
    return (
        <>
            <svg id={id} className='peca peao p' enableBackground="new 0 0 100 100" height="100px" version="1.1" viewBox="0 0 100 100" width="100px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="white_exp">
                <path d="M69.878,83.072C69.954,82.726,70,82.369,70,82c0-2.695-2.148-4.885-4.82-4.982c-0.16-0.265-0.323-0.524-0.489-0.783   
            c-1.822-2.842-4.552-7.112-4.685-33.235C62.76,42.996,65,40.755,65,38c0-2.707-2.166-4.905-4.853-4.985 
            C63.122,30.272,65,26.356,65,22c0-8.271-6.729-15-15-15s-15,6.729-15,15c0,4.356,1.878,8.272,4.853,11.015
            C37.166,33.095,35,35.293,35,38c0,2.755,2.24,4.996,4.994,5c-0.133,26.124-2.862,30.394-4.685,33.235   
            c-0.166,0.259-0.329,0.519-0.489,0.783C32.148,77.115,30,79.305,30,82c0,0.369,0.046,0.726,0.122,1.072   
            C27.229,83.499,25,85.99,25,89c0,3.309,2.691,6,6,6h38c3.309,0,6-2.691,6-6C75,85.99,72.771,83.499,69.878,83.072z M34,82   
            c0-0.542,0.458-1,1-1h30c0.542,0,1,0.458,1,1s-0.458,1-1,1H35C34.458,83,34,82.542,34,82z M39.535,77   
            c2.042-3.56,4.339-10.124,4.46-34h12.01c0.121,23.876,2.418,30.44,4.46,34H39.535z M39,22c0-6.065,4.935-11,11-11s11,4.935,11,11   
            s-4.935,11-11,11S39,28.065,39,22z M39,38c0-0.542,0.458-1,1-1h20c0.542,0,1,0.458,1,1s-0.458,1-1,1H40C39.458,39,39,38.542,39,38z    
            M69,91H31c-1.103,0-2-0.897-2-2s0.897-2,2-2h38c1.103,0,2,0.897,2,2S70.103,91,69,91z" />
            </g>
                <g id="black_exp" />
            </svg>

        </>


    );
}
export default PeaoP;