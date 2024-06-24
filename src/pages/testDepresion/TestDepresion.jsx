import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import NavBarComponent from '../../component/navBarComponent/NavBarComponent'
import APIGatewayService from '../../shared/services/api-gateway-service';
import { useNavigate } from 'react-router-dom';

const TestDepresion = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assessmentId, setAssessmentId] = useState(null);
    const [type, setType] = useState(1);
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        try {
            const response = await APIGatewayService.getQuestionsbyTestId(1);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const createAssessment = async () => {
        const currentDateTime = new Date().toISOString();
        const userId = JSON.parse(localStorage.getItem("user")).id;

        const data = {
            "date": currentDateTime,
            "user_Id": userId
        };
        try {
            const response = await APIGatewayService.createAssessment(data);
            setAssessmentId(response.data.id);
            console.log('Assessment created successfully', response);
            console.log("AssessmentId: ", assessmentId);
        } catch (error) {
            console.error('Error creating assessment:', error);
        }
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const getRecomendationsByDiagnoses = async (depressionDiagnose) => {
        try {
            const response = await APIGatewayService.getAssessmentRecommendationByRecommendationId(depressionDiagnose);
            console.log("Recomendaciones de depresión: ", response.data);
        } catch (error) {
            console.error('Error getting recomendations:', error);
        }
    }

    const calculateResults = async () => {
        try {
            const dataDepression = {
                "assessment_Id": assessmentId,
                "answers": answers
            };
            const response = await APIGatewayService.calculatedepression(dataDepression);
            // Enviar el diagnosis_Id al componente de recomendaciones
            const diagnosisId = response.data.diagnosis_Id;
            navigate('/recomendaciones', { state: { diagnosisId, assessmentId, type } });
        } catch (error) {
            console.error('Error calculating results:', error);
        }
    }

    const handleSubmit = async () => {
        calculateResults();
    };

    const renderOptions = (questionIndex) => {
        const options = [
                { label: 'Ningún día', value: 0 },
                { label: 'Varios días', value: 1 },
                { label: 'Más de la mitad de los días', value: 2 },
                { label: 'Casi todos los días', value: 3 }
            ];

            return options.map(option => (
                <div key={option.value} className="p-field-radiobutton">
                    <RadioButton
                    inputId={`${questionIndex}-${option.value}`}
                    name={`question-${questionIndex}`}
                    value={option.value}
                    onChange={(e) => handleAnswerChange(questionIndex, e.value)}
                    checked={answers[questionIndex] === option.value}
                />
                    <label htmlFor={`${questionIndex}-${option.value}`}>{option.label}</label>
                </div>
            ));
    };

    const renderTable = () => (
        <DataTable value={questions}>
            <Column field="text" header="Pregunta" body={(rowData, { rowIndex }) => (
                <div>
                    <h3>{rowData.text}</h3>
                </div>
            )} />
            <Column field="options" header="Opciones" body={(rowData, { rowIndex }) => renderOptions(rowIndex)} />
        </DataTable>
    );

    useEffect(() => {
        createAssessment();
    }, []);
    
    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className='depression-evaluation'>
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className="de-body">
                <h1>Test de depresión</h1>
                {loading ? (
                    <p>Cargando preguntas...</p>
                ) : (
                    renderTable()
                )}
                <Button label="Enviar" icon="pi pi-check" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default TestDepresion;
