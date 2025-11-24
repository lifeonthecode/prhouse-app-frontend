import SearchForm from '../../Components/SearchForm';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div className='w-full flex'>
            {/* SIDEBAR  */}
            <div className='max-w-[260px]  w-full'>
                <Sidebar />
            </div>

            {/* MAIN LAYOUT  */}
            <main className='w-full pt-4'>
                <div className='w-full fixed top-0 left-0 z-10 h-[100px]'>
                    <SearchForm />
                </div>
                <div className='pt-[100px]'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default HomeLayout;