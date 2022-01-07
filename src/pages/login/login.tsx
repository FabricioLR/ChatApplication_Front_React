import { Link } from "react-router-dom"
import style from "./style.module.css"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { useNavigate } from "react-router"
import imagem from "../../images/login3.jpg"

function Login() {
    const navigate = useNavigate()
    const { Login } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function loader(){
        document.getElementById(style.loader)?.classList.toggle(style.active)
        document.querySelector(`#${style.form} button`)?.classList.toggle(style.activebutton)
    }

    async function login(){
        loader()
        if (email && senha){
            if (await Login({ email, senha })){
                loader()
                navigate("/chat")
            }
        }
    }

    return (
        <main id={style.main}>
            <div id={style.conteudo}>
                <div id={style.image}>
                    <img src={imagem} alt="1"/>
                </div>
                <div id={style.input}>
                    <h2>Login</h2>
                    <div id={style.form}>
                        <label>Email</label>
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/>
                        <label>Senha</label>
                        <input type="text" id="senha" onChange={(e) => setSenha(e.target.value)}/>
                        <p>Ainda não está cadastrado? <Link to="/cadastro">Cadastrar</Link></p>
                        <button onClick={login}><div id={style.loader}></div>Log In</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login
