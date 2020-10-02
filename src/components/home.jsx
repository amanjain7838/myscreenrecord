import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import SettingContext from '../context/settingContext';

const Home = props =>{
    const settingContext=useContext(SettingContext);
    return (
        <div>
            <Link to="/record"  className="btn btn-primary">Record</Link>
        </div>
    );
}
export default Home;