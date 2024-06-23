import './SignIn.css'
import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import APIGatewayService from '../../shared/services/api-gateway-service';

const SignIn = () => {
    const navegar = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({severity: severity, summary: summary, detail: detail});
    }

    const signIn = async () => {
        if (email === '' || password === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const data = {
            "email": email,
            "password": password
        }

        try {
            const response = await APIGatewayService.verifyPatient(data)
            localStorage.setItem('user', JSON.stringify(response.data))
            navegar('/home')
        } catch (error) {
            showToast('error', 'Error', 'Credenciales incorrectas')
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            signIn()
        }
    }

    return (
        <div className="sign-in">
            <Toast ref={toast} />
            <div className='si-left'>
                <div className='sill'>
                    <h1>Bienvenido a MindWell!</h1>
                    <p>Inicie sesión y disfrute de los beneficios de nuestra aplicación en su vida diaria.</p>
                </div>
            </div>
            <div className="si-right">
                <div className='sir-body'>
                    <label htmlFor="email">Email</label>
                    <InputText
                    id='email'
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <InputText
                    id='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                    label='Iniciar sesión'
                    onClick={signIn}
                    onKeyDown={handleEnter}
                    />
                    <p>¿No tienes una cuenta? <a href='/sign-up'>Registrate</a></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn