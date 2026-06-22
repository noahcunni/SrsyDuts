import { Outlet } from 'react-router';
import PublicNavbar from '../navbar/PublicNavbar';


function PublicLayout() {
    return(
        <div>
            <PublicNavbar />
            <Outlet />
        </div>
    );
}

export default PublicLayout