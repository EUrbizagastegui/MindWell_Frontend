import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signup/SignUp';
import Home from '../pages/home/Home';
import Personallog from '../pages/personallog/Personallog';
import Notifications from '../pages/notifications/Notifications';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/home' element={<Home />} />
                <Route path='/personallog' element={<Personallog />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/' element={<Navigate to='/sign-in' />} />
                <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter