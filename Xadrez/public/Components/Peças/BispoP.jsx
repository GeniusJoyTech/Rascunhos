import './css/pecas.css'

const BispoP= (props) =>{
    const { id } = props;
    return(
        <svg id={id} className='peca p' enable-background="new 0 0 100 100" height="100px" version="1.1" viewBox="0 0 100 100" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="white_exp"><path d="M69.878,83.072C69.954,82.726,70,82.369,70,82c0-2.757-2.243-5-5-5h-0.769c-0.131-0.612-0.273-1.218-0.424-1.854   c-1.032-4.367-2.397-10.149-2.73-30.27C63.316,44.381,65,42.386,65,40c0-1.977-1.163-3.674-2.832-4.485   C63.422,33.113,65,29.415,65,26c0-3.21-3.22-7.173-6.948-11.761C55.498,11.095,52,6.79,52,5h-4c0,1.79-3.498,6.095-6.052,9.239   C38.22,18.827,35,22.79,35,26c0,3.415,1.578,7.113,2.832,9.515C36.163,36.326,35,38.023,35,40c0,2.386,1.684,4.381,3.923,4.876   c-0.333,20.121-1.698,25.903-2.73,30.27c-0.15,0.636-0.293,1.242-0.424,1.854H35c-2.757,0-5,2.243-5,5   c0,0.369,0.046,0.726,0.122,1.072C27.229,83.499,25,85.99,25,89c0,3.309,2.691,6,6,6h38c3.309,0,6-2.691,6-6   C75,85.99,72.771,83.499,69.878,83.072z M40,41c-0.542,0-1-0.458-1-1s0.458-1,1-1h20c0.542,0,1,0.458,1,1s-0.458,1-1,1H40z    M43.565,18.603l2.646,5.292l3.578-1.789l-3.461-6.921c1.406-1.747,2.687-3.397,3.672-4.938c1.277,1.998,3.047,4.175,4.948,6.516   C57.502,19.905,61,24.21,61,26c0,3.285-2.095,7.257-3.117,9H42.117C41.095,33.257,39,29.285,39,26   C39,24.541,41.323,21.412,43.565,18.603z M40.085,76.066c1.072-4.537,2.49-10.549,2.836-31.066h14.158   c0.346,20.517,1.764,26.53,2.836,31.066c0.076,0.323,0.145,0.626,0.216,0.934H39.869C39.94,76.692,40.009,76.39,40.085,76.066z    M35,81h30c0.542,0,1,0.458,1,1s-0.458,1-1,1H35c-0.542,0-1-0.458-1-1S34.458,81,35,81z M69,91H31c-1.103,0-2-0.897-2-2   s0.897-2,2-2h38c1.103,0,2,0.897,2,2S70.103,91,69,91z"/></g><g id="black_exp"/></svg>
    );
}
export default BispoP;