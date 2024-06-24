import './Evaluaciones.css'
import NavBarComponent from '../../component/navBarComponent/NavBarComponent'
import APIGatewayService from '../../shared/services/api-gateway-service';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Evaluaciones = () => {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    const navigate = useNavigate();

    const fetchEvaluaciones = async (userId) => {
        try {
            const response = await APIGatewayService.getAssessmentsByPacientId(userId);
            setEvaluaciones(response.data);
        } catch (error) {
            console.error('Error fetching evaluations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchEvaluaciones(userId);
        } else {
            setLoading(false);
        }
    }, []);

    const formatDate = (isoDate) => {
        const dateObj = new Date(isoDate);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
        const year = dateObj.getFullYear();

        return `${day}/${month}/${year}`;
    };
    
    return (
        <div className='evaluaciones'>
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className="evaluaciones-body">
                <div className='evaluaciones-title'>
                    <h1>Sus evaluaciones</h1>
                    <Button
                        label="Empezar una nueva evaluación"
                        icon="pi pi-plus"
                        onClick={() => navigate('/register-evaluation')}
                        />
                </div>
                {loading ? (
                    <p>Cargando...</p>
                ) : evaluaciones.length === 0 ? (
                    <>
                        <h1>No hay evaluaciones registradas</h1>
                        <Button
                        label="Empezar una evaluación"
                        icon="pi pi-plus"
                        onClick={() => navigate('/register-evaluation')}
                        />
                    </>
                ) : (
                    evaluaciones.map((evaluacion, index) => (
                        <Card
                        key={index}
                        title={`Evaluación #${index + 1}`}
                        style={{ width: '40%' }}
                        >
                            <h2>{formatDate(evaluacion.date)}</h2>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

export default Evaluaciones