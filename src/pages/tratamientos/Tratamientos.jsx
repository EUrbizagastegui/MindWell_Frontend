import './Tratamientos.css'
import NavBarComponent from '../../component/navBarComponent/NavBarComponent'
import { useState, useEffect } from 'react'
import APIGatewayService from '../../shared/services/api-gateway-service';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';

const Tratamientos = () => {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvaluaciones = async () => {
            try {
                const response = await APIGatewayService.getAssessmentsByPacientId(userId);
                const evaluacionesData = response.data;
                const evaluacionesConInfo = await Promise.all(
                    evaluacionesData.map(async (evaluacion) => {
                        const diagnosis = await getDiagnostico(evaluacion.diagnosis_Id);
                        const category = await getCategoria(evaluacion.diagnosis_Id);
                        return {
                            ...evaluacion,
                            diagnosis,
                            category
                        };
                    })
                );
                setEvaluaciones(evaluacionesConInfo);
                setLoading(false);
                console.log("Evaluaciones: ", evaluacionesConInfo);
            } catch (error) {
                console.error('Error fetching evaluations:', error);
                setLoading(false);
            }
        };

        if (userId) {
            fetchEvaluaciones();
        } else {
            setLoading(false);
        }
    }, [userId]);

    const getDiagnostico = async (diagnosisId) => {
        try {
            const response = await APIGatewayService.getDiagnosisById(diagnosisId);
            return response.data.name;
        } catch (error) {
            console.error('Error getting diagnosis:', error);
            return 'Desconocido';
        }
    };

    const getCategoria = async (diagnosisId) => {
        try {
            const response = await APIGatewayService.getRecommendationsbyDiagnosisId(diagnosisId);
            return response.data.category;
        } catch (error) {
            console.error('Error getting category:', error);
            return 'Desconocida';
        }
    };

    return (
        <div className='tratamientos'>
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className="te-body">
                <h1>Sus tratamientos</h1>
                {loading ? (
                    <p>Cargando...</p>
                ) : evaluaciones.length === 0 ? (
                    <h1>No hay evaluaciones registradas</h1>
                ) : (
                    evaluaciones.map((evaluacion, index) => (
                        <Card
                        key={evaluacion.id}
                        style={{ width: '100%' }}
                        >
                            <h1>Evaluación #{index + 1}</h1>
                            <h2>Diagnóstico: {evaluacion.diagnosis}</h2>
                            <h2>Fecha: {new Date(evaluacion.date).toLocaleDateString()}</h2>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

export default Tratamientos