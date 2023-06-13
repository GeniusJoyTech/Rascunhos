import { useState } from "react"
import { useAuthContext } from "../hooks/useAuth.Context";

export default function Login() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const { login } = useAuthContext()

    function handleEmail(e) {
        const target = e.target.value;
        setEmail(target)
    }

    function handlePassword(e) {
        const target = e.target.value;
        setPassword(target)
    }

    async function handleLogin(e) {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <>
                <div id="rosto">
                    <svg width="256" height="256" fill="#000">
                        <path
                            d="M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z">
                        </path>
                    </svg>
                </div>
                <div id="dados-login">
                    <form onSubmit={handleLogin}>
                        <label forhtml="email">Login:</label>
                        <br /><input type="email" onChange={handleEmail} />

                        <br /><label forhtml="senha">Senha:</label>
                        <br /><input type="password" onChange={handlePassword} />
                        <br /><br /><button type="submit">Acesso</button>
                    </form>
                    <a href="#">Esqueceu a senha? Clique aqui!</a>
                </div>

                <h1>Ponto móvel</h1>


                <footer id="rodape">
                    <p>Ponto móvel é uma aplicação desenvolvida
                        pelo fatecano Gabriel Jesus.
                        Tem como intuito ser um trabalho de graduação.</p>
                    <br /><p>© Todos os direitos reservados. ©</p>
                </footer>
        </>
    )
}