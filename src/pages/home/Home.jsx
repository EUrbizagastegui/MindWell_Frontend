import NavBarComponent from '../../component/navBarComponent/NavBarComponent'
import { Button } from 'primereact/button';
import './Home.css'

const Home = () => {
    

    return (
        <div className="home">
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className='home-body'>
                <div className="hb-center">
                    <h1>¡Bienvenido a MindWell!</h1>
                    <p>En MindWell, creemos que tu bienestar mental es fundamental para llevar una vida plena y satisfactoria. Estamos aquí para apoyarte en cada paso de tu viaje hacia la salud mental y emocional.</p>
                    <h3>Nuestra misión</h3>
                    <p>Proporcionar herramientas, recursos y apoyo accesibles y efectivos para ayudarte a enfrentar los desafíos de la vida y alcanzar un estado de equilibrio y felicidad.</p>
                    <h3>Tú importas</h3>
                    <p>Recuerda que cuidar de tu salud mental es un acto de amor propio. Aquí en MindWell, te proporcionamos un espacio seguro y acogedor donde puedes explorar, aprender y crecer.</p>
                    <Button label='Comenzar evaluación' severity="secondary"/>
                </div>
            </div>
        </div>
    )
}

export default Home