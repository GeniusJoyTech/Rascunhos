import './css/pecas.css'

const CavaloB = (props) => {
    const { id, cor } = props;
    return(
        <svg id={id} className={`peca cavalo ${cor}`} enableBackground="new 0 0 100 100" height="100px" version="1.1" viewBox="0 0 100 100" width="100px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="white_exp"><path d="M72.878,83.072C72.954,82.726,73,82.369,73,82c0-2.757-2.243-5-5-5h-1.957c0.426-11.358,4.38-20.888,7.615-28.635   C76.398,44.246,78,39.307,78,34C78,19.664,66.336,8,52,8h-2v5h-7c-4.74,0-8.626,3.686-8.967,8.34   c-0.568,0.454-1.87,1.254-2.954,1.918C25.871,26.453,18,31.281,18,38c0,4.739,3.685,8.625,8.338,8.966   C27.154,49.311,29.381,51,32,51c2.831,0,5.21-1.971,5.838-4.612l4.819-2.065c0.695,0.497,1.451,0.869,2.235,1.131   C44.178,50.833,39.571,55,34,55h-2.19l2,22H32c-2.757,0-5,2.243-5,5c0,0.369,0.046,0.726,0.122,1.072C24.229,83.499,22,85.99,22,89   c0,3.309,2.691,6,6,6h44c3.309,0,6-2.691,6-6C78,85.99,75.771,83.499,72.878,83.072z M36.176,58.843   c6.657-0.972,11.896-6.335,12.704-13.044c1.731-0.262,3.397-1.054,4.727-2.385c1.605-1.605,2.49-3.74,2.49-6.01   s-0.884-4.405-2.49-6.01l-2.828,2.828c1.754,1.755,1.754,4.609,0,6.364c-1.755,1.754-4.609,1.754-6.364,0l-0.958-0.958L34,43.681   V45c0,1.103-0.897,2-2,2c-1.052,0-1.907-0.818-1.985-1.851l3.234-2.587l-2.499-3.123l-4.373,3.499C23.917,42.626,22,40.543,22,38   c0-4.48,6.993-8.77,11.171-11.332C36.487,24.634,38,23.706,38,22c0-2.757,2.243-5,5-5h7v3h4v-7.91C65.198,13.104,74,22.543,74,34   c0,12.131-9.869,22-22,22v4c5.367,0,10.36-1.635,14.506-4.433C64.25,61.81,62.313,68.913,62.035,77H37.827L36.176,58.843z M32,81   h36c0.542,0,1,0.458,1,1s-0.458,1-1,1H32c-0.542,0-1-0.458-1-1S31.458,81,32,81z M72,91H28c-1.103,0-2-0.897-2-2s0.897-2,2-2h44   c1.103,0,2,0.897,2,2S73.103,91,72,91z M44.971,19.285l2.058,3.43l-5,3l-2.058-3.43L44.971,19.285z M25.891,35.336l2.219,3.328   l-3,2l-2.219-3.328L25.891,35.336z" /></g><g id="black_exp" /></svg>
    );
}
export default CavaloB;