import './Recomendaciones.css'
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import NavBarComponent from '../../component/navBarComponent/NavBarComponent'
import APIGatewayService from '../../shared/services/api-gateway-service';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

const Recomendaciones = () => {
    const location = useLocation();
    const diagnosisId = location.state?.diagnosisId;
    const assessmentId = location.state?.assessmentId;
    const type = location.state?.type;
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [diagnostico, setDiagnostico] = useState('Cargando...');
    const navigate = useNavigate();

    const fetchRecomendacionesByDiagnosisId = async (diagnosisId) => {
        try {
            const response = await APIGatewayService.getRecommendationsbyDiagnosisId(diagnosisId);
            setRecomendaciones(response.data);
            console.log("Recomendaciones de depresión: ", response.data);
        } catch (error) {
            console.error('Error getting recomendations:', error);
        }
    }

    const createAssessmentRecommendation = async (assessmentId, recommendationId) => {
        let tipoTest = ''

        if (type === 1) {
            tipoTest = 'depresión'
        } else {
            tipoTest = 'ansiedad'
        }
        
        const data = {
            "assessment_Id": assessmentId,
            "recommendation_Id": recommendationId
        };
        const dataNotification = {
            "text": `Se eligió un nuevo tratamiento para un diagnóstico de ${tipoTest}`,
            "category": `${tipoTest.toUpperCase()}`,
            "user_id": userId
        };

        try {
            console.log("Data: ", data);
            const response = await APIGatewayService.createAssesssmentRecommendation(data);
            console.log('Assessment Recommendation created successfully', response);
            const responseNotification = await APIGatewayService.createNotification(dataNotification);
            console.log('Notification created successfully', responseNotification);
            navigate('/notifications');
        } catch (error) {
            console.error('Error creating assessment recommendation:', error);
        }
    }

    const getDiagnostico = async (diagnosisId) => {
        try {
            const response = await APIGatewayService.getDiagnosisById(diagnosisId);
            const nombreDiagnostico = response.data.name;
            setDiagnostico(nombreDiagnostico);
        } catch (error) {
            console.error('Error getting diagnosis:', error);
            setDiagnostico('Desconocido');
        }
    };

    useEffect(() => {
        if (diagnosisId) {
            getDiagnostico(diagnosisId);
            fetchRecomendacionesByDiagnosisId(diagnosisId);
        }
    }, [diagnosisId]);

    const renderCards = () => {
        return recomendaciones.map((recomendacion) => (
            <Card
            className='re-card'
            key={recomendacion.id}
            title={recomendacion.category === 'DIN' || recomendacion.category === 'AIN' ? 'En casa' : 'En el exterior'}
            onClick={() => createAssessmentRecommendation(assessmentId, recomendacion.id)}>
                <h3>{recomendacion.description}</h3>
                <br />
                <p>Frecuencia: {recomendacion.frecuency}</p>
            </Card>
        ));
    };

    return (
        <div className='recomendaciones'>
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <h1>Recomendaciones</h1>
            <h3>Diagnóstico: {diagnostico}</h3>
            <div className='re-body'>
                {renderCards()}
            </div>
        </div>
    )
}

export default Recomendaciones