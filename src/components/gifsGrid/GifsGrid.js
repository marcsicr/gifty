import Gif, {COLORS} from 'components/gif/Gif'

import './grid.css'

export default function GifsGrid({gifs,emptyMsg="Not gifs found"}){

    return (
      <div className="grid-masonry">
            {   gifs.length >= 1? 
                gifs.map(({id, title, url,username,user_avatar},index) =>
                    <Gif key={id}
                         id={id} 
                         title={title} 
                         url={url}
                         username={username} 
                         avatar_url={user_avatar}
                         color={index % COLORS.length}/>
                ):<div>{emptyMsg}</div>
                
            }
      </div>)
}