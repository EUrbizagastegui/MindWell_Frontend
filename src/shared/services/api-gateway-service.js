import httpCommon from "../http-common/http-common";

class APIGatewayService {
    getAllPatients() {
        return httpCommon.get("/apigateway/patients")
    }
    createPatient(data) {
        return httpCommon.post("/apigateway/patients", data)
    }
    getPatientById(id) {
        return httpCommon.get(`/apigateway/patients/${id}`)
    }
    updatePatient(id, data) {
        return httpCommon.put(`/apigateway/patients/${id}`, data)
    }
    deletePatient(id) {
        return httpCommon.delete(`/apigateway/patients/${id}`)
    }
    verifyPatient(data) {
        return httpCommon.post("/apigateway/patients/verify-patient", data)
    }
    updatePatientPassword(data) {
        return httpCommon.put("/apigateway/patients/update-password", data)
    }
    getAllAssessments() {
        return httpCommon.get("/apigateway/assessments")
    }
    createAssessment(data) {
        return httpCommon.post("/apigateway/assessments", data)
    }
    getAssessmentById(id) {
        return httpCommon.get(`/apigateway/assessments/${id}`)
    }
    updateAssessment(id, data) {
        return httpCommon.put(`/apigateway/assessments/${id}`, data)
    }
    deleteAssessment(id) {
        return httpCommon.delete(`/apigateway/assessments/${id}`)
    }
    calculateAnxiety(data) {
        return httpCommon.post("/apigateway/assessments/calc-anxiety", data)
    }
    calculatedepression(data) {
        return httpCommon.post("/apigateway/assessments/calc-depression", data)
    }
    getAllAssesmentsRecommendations() {
        return httpCommon.get("/apigateway/assessmentsrecommendations")
    }
    createAssesssmentRecommendation(data) {
        return httpCommon.post("/apigateway/assessmentsrecommendations", data)
    }
    getAssesssmentRecommendationById(id) {
        return httpCommon.get(`/apigateway/assessmentsrecommendations/${id}`)
    }
    getAssessmentRecommendationByAssessmentId(id) {
        return httpCommon.get(`/apigateway/assessmentsrecommendations/assessment/${id}`)
    }
    getAssessmentRecommendationByRecommendationId(id) {
        return httpCommon.get(`/apigateway/assessmentsrecommendations/recommendation/${id}`)
    }
    getAllDiagnoses() {
        return httpCommon.get("/apigateway/diagnoses")
    }
    getDiagnosisById(id) {
        return httpCommon.get(`/apigateway/diagnoses/${id}`)
    }
    getAllQuestions() {
        return httpCommon.get("/apigateway/questions")
    }
    getQuestionById(id) {
        return httpCommon.get(`/apigateway/questions/${id}`)
    }
    getQuestionsbyTestId(id) {
        return httpCommon.get(`/apigateway/questions/test/${id}`)
    }
    getAllRecommendations() {
        return httpCommon.get("/apigateway/recommendations")
    }
    getRecommendationById(id) {
        return httpCommon.get(`/apigateway/recommendations/${id}`)
    }
    getRecommendationsbyDiagnosisId(id) {
        return httpCommon.get(`/apigateway/recommendations/diagnosis/${id}`)
    }
    getRecommendatinosByDepressionTestScore(score) {
        return httpCommon.get(`/apigateway/recommendations/depression-test/${score}`)
    }
    getRecommendatinosByAnxietyTestScore(score) {
        return httpCommon.get(`/apigateway/recommendations/anxiety-test/${score}`)
    }
    getAllTests() {
        return httpCommon.get("/apigateway/tests")
    }
    getTestById(id) {
        return httpCommon.get(`/apigateway/tests/${id}`)
    }
    getAlltreatments() {
        return httpCommon.get("/apigateway/treatments")
    }
    createTreatment(data) {
        return httpCommon.post("/apigateway/treatments", data)
    }
    getTreatmentById(id) {
        return httpCommon.get(`/apigateway/treatments/${id}`)
    }
    updateTreatment(id, data) {
        return httpCommon.put(`/apigateway/treatments/${id}`, data)
    }
    deleteTreatment(id) {
        return httpCommon.delete(`/apigateway/treatments/${id}`)
    }
    getAllNotifications() {
        return httpCommon.get("/apigateway/notifications")
    }
    createNotification(data) {
        return httpCommon.post("/apigateway/notifications", data)
    }
    getNotificationById(id) {
        return httpCommon.get(`/apigateway/notifications/${id}`)
    }
    updateNotification(id, data) {
        return httpCommon.put(`/apigateway/notifications/${id}`, data)
    }
    deleteNotification(id) {
        return httpCommon.delete(`/apigateway/notifications/${id}`)
    }
    getAllNotificationsByUserId(id) {
        return httpCommon.get(`/apigateway/notifications/user/${id}`)
    }
    getAllPersonalLogs() {
        return httpCommon.get("/apigateway/personallogs")
    }
    createPersonalLog(data) {
        return httpCommon.post("/apigateway/personallogs", data)
    }
    getPersonalLogById(id) {
        return httpCommon.get(`/apigateway/personallogs/${id}`)
    }
    updatePersonalLog(id, data) {
        return httpCommon.put(`/apigateway/personallogs/${id}`, data)
    }
    deletePersonalLog(id) {
        return httpCommon.delete(`/apigateway/personallogs/${id}`)
    }
    getAllPersonalLogsByUserId(id) {
        return httpCommon.get(`/apigateway/personallogs/user/${id}`)
    }
    getFetchHistory() {
        return httpCommon.get("/apigateway/fetchhistories")
    }
    updateFetchHistory(data) {
        return httpCommon.put(`/apigateway/fetchhistories`, data)
    }
    getAllResources() {
        return httpCommon.get("/apigateway/resources")
    }
    getResourceById(id) {
        return httpCommon.get(`/apigateway/resources/${id}`)
    }
    getResourcesByCategory(category) {
        return httpCommon.post("/apigateway/resources/category", {category: category});
    }
    fetchResources() {
        return httpCommon.post("/apigateway/resources/fetch-resources", {})
    }
    postUserResources(data){
        return httpCommon.post("apigateway/usersresources", data);
    }
    getAllUserResources() {
        return httpCommon.get("/apigateway/usersresources")
    }
    getUserResourceById(id) {
        return httpCommon.get(`/apigateway/usersresources/${id}`)
    }
    getUserResourcesByUserId(id) {
        return httpCommon.get(`/apigateway/usersresources/user/${id}`)
    }
    getUserResourcesByResourceId(id) {
        return httpCommon.get(`/apigateway/usersresources/resource/${id}`)
    }
}

export default new APIGatewayService()