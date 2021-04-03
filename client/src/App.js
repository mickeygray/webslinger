import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import VerticalState from "./context/vertical/VerticalState";
import AlertState from "./context/alert/AlertState";
import SiteState, { AppWrapper } from "./context/site/SiteState";

import AuthState from "./context/auth/AuthState";
import BlogState from "./context/blog/BlogState";
import FirmState from "./context/firm/FirmState";
import EmailState from "./context/email/EmailState";
import LeadState from "./context/lead/LeadState";
import ReviewState from "./context/review/ReviewState";
import ImageState from "./context/image/ImageState";
import ArticleState from "./context/article/ArticleState";
import QuizState from "./context/quiz/QuizState";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Verticals from "./components/pages/Verticals";
import Alerts from "./components/layout/Alerts";
import Reviews from "./components/pages/Reviews";
import Emails from "./components/pages/Emails";
import Firms from "./components/pages/Firms";
import Blogs from "./components/pages/Blogs";
import Quizzes from "./components/pages/Quizzes";
import Articles from "./components/pages/Articles";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/routing/PrivateRoute";
import Images from "./components/pages/Images";
import { ComponentWrapper } from "./components/component/state/componentState";

const App = () => {
 return (
  <AuthState>
   <SiteState>
    <ImageState>
     <VerticalState>
      <BlogState>
       <LeadState>
        <EmailState>
         <QuizState>
          <ArticleState>
           <FirmState>
            <ReviewState>
             <AlertState>
              <AppWrapper>
               <ComponentWrapper>
                <Router>
                 <Fragment>
                  <Navbar />
                  <div className='container'>
                   <Alerts />
                   <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <PrivateRoute
                     exact
                     path='/verticals'
                     component={Verticals}
                    />
                    <PrivateRoute exact path='/reviews' component={Reviews} />
                    <PrivateRoute exact path='/quizzes' component={Quizzes} />
                    <PrivateRoute exact path='/articles' component={Articles} />
                    <PrivateRoute exact path='/blogs' component={Blogs} />
                    <PrivateRoute exact path='/emails' component={Emails} />
                    <PrivateRoute exact path='/images' component={Images} />
                    <PrivateRoute exact path='/firms' component={Firms} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                   </Switch>
                  </div>
                 </Fragment>
                </Router>
               </ComponentWrapper>
              </AppWrapper>
             </AlertState>
            </ReviewState>
           </FirmState>
          </ArticleState>
         </QuizState>
        </EmailState>
       </LeadState>
      </BlogState>
     </VerticalState>
    </ImageState>
   </SiteState>
  </AuthState>
 );
};

export default App;
