import {Route, Switch} from 'wouter'
import Home from 'pages/Home'
import SearchResults from 'pages/SearchResults'
import Trendings from 'pages/Trendings'
import Favorites from 'pages/Favorites'
import Settings from 'pages/Settings'
import './App.css'
import NotFound from 'pages/NotFound'
import LoginPage from 'pages/Login'
import Register from 'pages/Register'
import { FlashMessageProvider } from 'context/FlashMessageContext'
import {GiftyContextProvider} from 'context/GiftyContext'
import GifDetails from 'pages/GifDetails'

function App() {

  return (
    <FlashMessageProvider>
      <GiftyContextProvider>
          <div className="app-wrapper">
            <Switch>
              <Route component={Home} path="/"/>
              <Route component={SearchResults} path="/search/:keyword/:rating?"></Route>
              <Route component={Trendings} path="/trending-gifs"/>
              <Route component={LoginPage} path="/login"/>
              <Route component={GifDetails} path="/gifs/:idGif"/>
              <Route component={Register} path="/register"/>
              <Route component={Favorites} path="/favorites"/>
              <Route component={Settings} path ="/settings"/>
              <Route component={NotFound} path="/:rest"/>
            </Switch>
          </div>
      </GiftyContextProvider>
    </FlashMessageProvider>
  )
}

export default App;
