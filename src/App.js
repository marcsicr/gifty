import {Route, Switch} from 'wouter'
import Home from 'pages/Home'
import SearchResults from 'pages/SearchResults'
import Trendings from 'pages/Trendings'
import Favorites from 'pages/Favorites'
import Settings from 'pages/Settings'
import './App.css'
import NotFound from 'pages/NotFound'
import { UserContextProvider } from 'context/UserContext'
import LoginPage from 'pages/Login'
import Register from 'pages/Register'
import { FavsContextProvider } from 'context/FavsContext'
import { FlashMessageProvider } from 'context/FlashMessageContext'

function App() {

  return (
    <FlashMessageProvider>
    <UserContextProvider>
      <FavsContextProvider>
      <div className="app-wrapper">
        <Switch>
          <Route component={Home} path="/"/>
          <Route component={SearchResults} path="/search/:keyword/:rating?"/>
          <Route component={Trendings} path="/trending-gifs"/>
          <Route component={LoginPage} path="/login"/>
          <Route component={Register} path="/register"/>
          <Route component={Favorites} path="/favorites"/>
          <Route component={Settings} path ="/settings"/>
          <Route component={NotFound} path="/:rest"/>

        </Switch>
      </div>
      </FavsContextProvider>
    </UserContextProvider>
    </FlashMessageProvider>
  )
}

export default App;
