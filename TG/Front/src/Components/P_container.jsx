import './css/P_container.css'
function P_container(props) {
    return (
        <main>
            <div className="container">
                {props.children}
            </div>
        </main>
    );
}
export default P_container;