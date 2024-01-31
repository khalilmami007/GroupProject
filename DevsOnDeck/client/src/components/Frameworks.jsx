import React, { useState } from 'react'
import axios from 'axios';
import {useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import SubHeader from './SubHeader';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Frameworks = (props) => {
    
    const {id} = useParams(); 

const [frameworks, setFrameworks] = useState([]); 
const [profile, setProfile] = useState(""); 
const [lang1, setLang1] = useState(""); 
const [lang2, setLang2] = useState(""); 
const [lang3, setLang3] = useState(""); 
const [lang4, setLang4] = useState(""); 
const [lang5, setLang5] = useState(""); 
const [count, setCount] = useState(1); 
const [now, setNow] = useState(0); 
const AddSkills = (e) => {
    e.preventDefault();
    axios.patch('http://localhost:8000/api/skills/frameworks/'+id, {
         
        frameworks:frameworks,
        profile:profile
    })
        .then(res => {
            console.log(res);
        })
        .catch( err => console.log(err) ) 
}

   const AddLang = (url,lang) => {
         setNow(now+20)
         setCount(count+1)
         if(count===1){setLang1(url)}
         if(count===2){setLang2(url)}
         if(count===3){setLang3(url)}
         if(count===4){setLang4(url)}
         if(count===5){setLang5(url)}
        setFrameworks([...frameworks,lang])
        console.log("les frameworks sont  "+frameworks)
        console.log("selected language is", lang)
}
   

    return (
        <div>
            <SubHeader/>
            <Card style={{ width: '900px', height: '600px' }} border='secondary' >
               
                <div className='subheader'><h2>Add your Skills</h2>
                <div className='divbar'><ProgressBar now={now} label={`${now}%`} visuallyHidden /></div> 
                </div>              
            <Container className='contStyle'>
            <Row>
                <Col className='ColStyle'><h3>Pick Your Top 5 Frameworks or Librairies</h3></Col>
                 <Col className='ColStyle'> <div className='langContainer'> 
                 <div>
                    {lang1 ?<img src={require(`${lang1}`)} id="css" alt="css icon" className='iconStyle2'/> :''}</div>
                    <div>
                    {(lang2)?<img src={require(`${lang2}`)} id="css" alt="css icon" className='iconStyle2'/> :''}
                    </div>
                    <div>
                    {(lang3) ?<img src={require(`${lang3}`)} id="css" alt="css icon" className='iconStyle2'/> :''}
                    </div>
                    <div>
                    {(lang4) ?<img src={require(`${lang4}`)} id="css" alt="css icon" className='iconStyle2'/> :''}
                    </div>
                    <div>
                    {(lang5) ?<img src={require(`${lang5}`)} id="css" alt="css icon" className='iconStyle2'/> :''}
                </div>
                </div></Col>
            </Row>
      <Row>
        <Col className='ColStyle'>
            <div  className='iconcontainer'>
        <table>
            <tr>
                <td> <img src={require("./icons/django.png")} id="django" alt="django" className='iconStyle'
                onClick={() => AddLang("./icons/django.png","django")}/></td>
                <td><img src={require("./icons/flask-horizontal.png")}id="flask" alt="flask" className='iconStyle'
                onClick={() => AddLang("./icons/flask-horizontal.png","flask")}/></td>
                <td><img src={require("./icons/rails.png")} id="rails" alt="rails" className='iconStyle'
                onClick={() => AddLang("./icons/rails.png","rails")}/></td>
                <td><img src={require("./icons/spring.png")}id="spring" alt="spring" className='iconStyle'
                onClick={() => AddLang("./icons/spring.png","spring")} /></td>
            </tr>
            <tr>
            <td> <img src={require("./icons/java.png")} id="java" alt="java" className='iconStyle'
            onClick={() => AddLang("./icons/java.png","java")}/></td>
                <td><img src={require("./icons/js.png")}id="js" alt="js" className='iconStyle'
                onClick={() => AddLang("./icons/js.png","js")}/></td>
                <td><img src={require("./icons/pyth.jpg")} id="pyth" alt="pyth" className='iconStyle'
                onClick={() => AddLang("./icons/pyth.jpg","python")}/></td>
                <td><img src={require("./icons/ruby.jpg")}id="ruby" alt="ruby" className='iconStyle'
                onClick={() => AddLang("./icons/ruby.jpg","ruby")} /></td>
        
            </tr>
            <tr>
            <td><img src={require("./icons/sql.png")} id="sql" alt="sql" className='iconStyle'
            onClick={() => AddLang("./icons/sql.png","sql")}/></td>
                <td><img src={require("./icons/swift.png")}id="swift" alt="swift" className='iconStyle'
                onClick={() => AddLang("./icons/swift.png","swift")}/></td>
                <td><img src={require("./icons/php.png")} id="php" alt="php" className='iconStyle'
                onClick={() => AddLang("./icons/php.png","php")}/></td>
                <td><img src={require("./icons/c++.png")} id="c++" alt="c++" className='iconStyle'
                onClick={() => AddLang("./icons/c++.png","c++")} /></td>
        
            </tr>
        </table>
        </div>
        </Col >
        <Col className='ColStyle'>
        <Form.Control as="textarea" rows={8} style={{ width: '300px' }} onChange = {(e)=>setProfile(e.target.value)}/>
        </Col>
        
      </Row>
      <Row><Col></Col>
      <Col className='ColStyle'>
      <button onClick={AddSkills} className='prfBtn'>COMPLETE PROFILE</button>
      </Col>
      </Row>
    </Container>
    </Card>
    </div>
    )
}

export default Frameworks