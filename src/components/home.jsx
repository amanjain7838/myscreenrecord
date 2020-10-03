import React from 'react';
import {Link} from 'react-router-dom';

const Home = props =>{
    const copyrightyear=new Date().getFullYear();
    return (
        <div className="container  text-center text-muted">
             <div className="row">
                <div className="col ">
                    <div className="logo">
                        <center>
                            <img alt="logo" width="70" src="images/logo.png"/>
                            <h1>RecordScreen<small>.io</small></h1>
                            <h4 className="font-weight-light">Record your screen right from the browser.<br/>No installation required.</h4>
                        </center>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-2">
                    <Link to="/record"  className="btn btn-info btn-block">Record</Link><br/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="footer">
                        <span><i>Videos are processed in the browser and are never sent to our servers.</i><br/><br/>By <a target="_blank" href="https://github.com/amanjain7838" rel="noopener noreferrer">Aman</a>. Copyright © {copyrightyear}.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;