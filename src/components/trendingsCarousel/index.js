import React from 'react'
import Carousel from 'components/carousel'
import LoadingDots from 'components/loadingDots'
import CarouselItem from 'components/carousel/carouselItem'
import useTrendsGifs from 'hooks/useTrendsGifs'
import SVG_TRENDS from 'img/svg_trends'
import SectionTitle, {ViewMoreLink} from 'components/sectionTitle'

export default function TrendingsCarousel({numElements = 15}){

    const {isLoading,gifs} = useTrendsGifs({rating:'g',limit:numElements})
    const elementHeight = 140
    return <>
        {   isLoading? <LoadingDots/> :
            <section className="trendings-carousel">
                 <SectionTitle title={"Trending GIFs"} svg={<SVG_TRENDS/>} viewMore={<ViewMoreLink message={"All the GIFs"} path="/trending-gifs"/>}/>
                
                <Carousel height={elementHeight}>
                    { 
                        gifs.map(({id,title,url},index) => <CarouselItem key={id} url={url} title={title} height={elementHeight}/>) 
                    }
                </Carousel> 
            </section>
        } 
    </>
}