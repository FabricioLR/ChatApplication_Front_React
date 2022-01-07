import style from "./style.module.css"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { useNavigate } from "react-router"
import imagem from "../../images/login3.jpg"
 
function Cadastro() {
    const navigate = useNavigate()
    const { Register } = useContext(AuthContext)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    
    async function register(){
        loader()
        if (senha && email && nome){
            if (await Register({nome, email, senha})){
                loader()
                navigate("chat")
            }
        }
    } 

    function loader(){
        document.getElementById(style.loader)?.classList.toggle(style.active)
        document.querySelector(`#${style.form} button`)?.classList.toggle(style.activebutton)
    }

    return (
        <main id={style.cadastro}>
            <div id={style.conteudo}>
                <div id={style.image}>
                    <img src={imagem} alt=""/>
                </div>
                <div id={style.input}>
                    <h2>Register</h2>
                    <div id={style.form}>
                        <label>Nome</label>
                        <input type="text" id="nome_cad" onChange={(e) => setNome(e.target.value)}/>
                        <label>Email</label>
                        <input type="text" id="email_cad" onChange={(e) => setEmail(e.target.value)}/>
                        <label>Senha</label>
                        <input type="text" id="senha_cad" onChange={(e) => setSenha(e.target.value)}/>
                        <button onClick={register}><div id={style.loader}></div>Cadastrar</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cadastro
